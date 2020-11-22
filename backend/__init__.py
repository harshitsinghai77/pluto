import os,sys
from flask import Flask,escape,request,Response,g,make_response, jsonify
from flask_cors import CORS
from flask.templating import render_template
from firebase_admin import credentials, initialize_app, storage, firestore
from backend.model.tf_hub import style_transfer, download_image, save_url_to_database
from backend.model import nst
from uuid import uuid4
from dotenv import load_dotenv

load_dotenv()

# print("hello ", {
#     "type": os.getenv("FIREBASE_TYPE"),
#     "project_id": os.getenv("FIREBASE_PROJECT_ID"),
#     "private_key_id": os.getenv("FIREBASE_PRIVATE_KEY_ID"),
#     "private_key": os.getenv("FIREBASE_PRIVATE_KEY"),
#     "client_email": os.getenv("FIREBASE_CLIENT_EMAIL"),
#     "client_id": os.getenv("FIREBASE_CLIENT_ID"),
#     "auth_uri": os.getenv("FIREBASE_AUTH_URI"),
#     "token_uri": os.getenv("FIREBASE_TOKEN_URI"),
#     "auth_provider_x509_cert_url": os.getenv("FIREBASE_AUTH_PROVIDER_X509_CERT_URL"),
#     "client_x509_cert_url": os.getenv("FIREBASE_CLIENT_X509_CERT_UR")
# })

# Initialize Flask application.
app=Flask(__name__)
app.debug=True
CORS(app)
image_folder = os.path.join(app.static_folder, "images")

# Temporary image storage directory.
tmp_folder = os.path.join(image_folder, "tmp")

# Temporary image storage directory.
hub_folder = os.path.join(image_folder, "hub")

if not os.path.exists(hub_folder):
    os.mkdir(hub_folder)

if not os.path.exists(tmp_folder):
    os.mkdir(tmp_folder)
    
keep_local_img = False    # Set this True to keep images in the tmp folder.

# Initialize firebase application.
cred = credentials.Certificate({
    "type": os.getenv("FIREBASE_TYPE"),
    "project_id": os.getenv("FIREBASE_PROJECT_ID"),
    "private_key_id": os.getenv("FIREBASE_PRIVATE_KEY_ID"),
    "private_key": os.getenv("FIREBASE_PRIVATE_KEY"),
    "client_email": os.getenv("FIREBASE_CLIENT_EMAIL"),
    "client_id": os.getenv("FIREBASE_CLIENT_ID"),
    "auth_uri": os.getenv("FIREBASE_AUTH_URI"),
    "token_uri": os.getenv("FIREBASE_TOKEN_URI"),
    "auth_provider_x509_cert_url": os.getenv("FIREBASE_AUTH_PROVIDER_X509_CERT_URL"),
    "client_x509_cert_url": os.getenv("FIREBASE_CLIENT_X509_CERT_UR")
})

storage_url = 'pycharm-neuro.appspot.com'
initialize_app(cred, {'storageBucket': storage_url})
firestore_client = firestore.client()
image_collection = firestore_client.collection('images')


@app.route('/nst_post',methods=['POST'])
def nst_post():
    if request.method =='POST':


        # Create a reference to the cloud storage bucket and a reference to the document in firestore.
        bucket = storage.bucket()
        doc_ref = image_collection.document()

        # Reference Image
        refer_img = request.form['selected_artist']
        refer_img_path = os.path.join(image_folder, "nst_get", f'nst_reference{refer_img}.JPG')

        # User Image
        user_img = request.files['target_image']
        image_extension = os.path.splitext(user_img.filename)[1]
        working_filename = doc_ref.id + image_extension
        user_img_path = os.path.join(tmp_folder, working_filename) 
        user_img.save(user_img_path)

        # Create and upload the blob containing the user image.
        blob = bucket.blob(working_filename)
        blob.upload_from_filename(user_img_path)
        blob.make_public()

        # Neural Style Transfer
        # transfer_img_path = nst.main(refer_img_path, user_img_path, tmp_folder
        transfer_img_path = tmp_folder + '/result_' + "wwIoptzpj9mhGdcyuSRP.jpeg"

        # Save the result to firebase storage.
        result_blob = bucket.blob(f'result_{working_filename}')
        result_blob.upload_from_filename(transfer_img_path)
        result_blob.make_public()

        # Construct and upload the data for this transaction.
        # db_data = {
        #     'target_image': blob.public_url,
        #     'result_image': result_blob.public_url,
        #     'timestamp': firestore.SERVER_TIMESTAMP,
        #     'style_image' : refer_img
        # }

        # print(db_data)
        # doc_ref.set(db_data)

        # Collate and send the data to the front end.
        fe_data = {
            'target_image': blob.public_url,
            'result_image': result_blob.public_url
        }

        # Clean up the images stored locally.
        if not keep_local_img:
            os.remove(transfer_img_path)
            os.remove(user_img_path)

        return fe_data

@app.route('/tf-hub/upload',methods=['POST'])
def style_transfer_file_upload():
    if request.method =='POST':

        # Create a reference to the cloud storage bucket and a reference to the document in firestore.
        bucket = storage.bucket()

        # Content Image
        content_img = request.files['contentImage']
        content_img_original = os.path.splitext(content_img.filename)
        content_img_filename = f"hub_{content_img_original[0]}_{uuid4()}{content_img_original[1]}"
        content_img_path = os.path.join(hub_folder, content_img_filename) 
        content_img.save(content_img_path)

        # Style Image
        style_img = request.files['styleImage']
        style_img_original = os.path.splitext(style_img.filename)
        style_img_filename = f"hub_{style_img_original[0]}_{uuid4()}{style_img_original[1]}"
        style_img_path = os.path.join(hub_folder, style_img_filename) 
        style_img.save(style_img_path)

        # Create and upload the blob containing the content image.
        blob_content = bucket.blob(content_img_filename)
        blob_content.upload_from_filename(content_img_path)
        blob_content.make_public()

         # Create and upload the blob containing the style image.
        blob_style = bucket.blob(style_img_filename)
        blob_style.upload_from_filename(style_img_path)
        blob_style.make_public()

        # Neural Style Transfer
        result_filename, result_img_path = style_transfer(hub_folder, content_img_path, style_img_path, content_img_original[1])
        
        # Save the result to firebase storage.
        result_blob = bucket.blob(result_filename)
        result_blob.upload_from_filename(result_img_path)
        result_blob.make_public()

        save_url_to_database(result_blob.public_url)

        response = make_response(
                jsonify(
                    {"success": True, 
                    "text": "Hello world", 
                    "original_img": blob_content.public_url,
                    "style_img": blob_style.public_url,
                    "result_img": result_blob.public_url}
                ),
                200,
            )
        return response

@app.route('/tf-hub/url',methods=['POST'])
def style_transfer_url():
    if request.method =='POST':

        # Create a reference to the cloud storage bucket and a reference to the document in firestore.
        bucket = storage.bucket()

        # Parsing request
        content = request.json

        # Content and Style URL
        content_link = content['contentURL']
        style_link = content['styleURL']

        # Content Image
        content_img_filename, content_img_path = download_image(hub_folder, content_link)

        # Content Image
        style_img_filename, style_img_path = download_image(hub_folder, style_link)

        # Getting image path of all the images
        result_filename, result_img_path = style_transfer(hub_folder, content_img_path, style_img_path)

        # Create and upload the blob containing the content image.
        blob_content = bucket.blob(content_img_filename)
        blob_content.upload_from_filename(content_img_path)
        blob_content.make_public()

         # Create and upload the blob containing the style image.
        blob_style = bucket.blob(style_img_filename)
        blob_style.upload_from_filename(style_img_path)
        blob_style.make_public()

        # # Save the result to firebase storage.
        result_blob = bucket.blob(result_filename)
        result_blob.upload_from_filename(result_img_path)
        result_blob.make_public()

        save_url_to_database(result_blob.public_url)

        response = make_response(
                jsonify(
                    {"success": True, 
                    "text": "Hello world", 
                    "original_img": blob_content.public_url,
                    "style_img": blob_style.public_url,
                    "result_img": result_blob.public_url}
                ),
                200,
            )
        return response

@app.route('/rate', methods=('PUT', 'POST'))
def rate():
    # Extract the json data.
    data = request.json
    rating = data['rating']
    doc_id = data['doc_id']

    # Update the Firestore document.
    image_collection.document(doc_id).update({'rating': rating})

    # Return a success message.
    return {'success': 'true'}


@app.route('/', methods=['GET'])
def hello_world():
    # Return a success message.
    return "Hello World"


# style_transfer(hub_folder)