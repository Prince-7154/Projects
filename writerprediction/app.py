import streamlit as st
from predictor import *
from PIL import Image
def main():
    
    st.title('Writer Prediction')
    st.write('Upload an image to predict Writer')
    st.write("Supported Images: No background and Gap between lines")
    # st.markdown("[Get Images for Testing:](https://huggingface.co/spaces/Ronishshrestha10/newmodel/resolve/main/static.zip?download=true)")
    # selected_option = st.sidebar.selectbox('Select an option', ['SVM','CCT'])
    uploaded_image = st.file_uploader("Choose an image...", type=["jpg", "jpeg", "png"])
    if uploaded_image is not None:
        image = Image.open(uploaded_image)
        st.image(image, caption='Uploaded Image', use_column_width=True)
       
        im = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)
        # if selected_option=="SVM":
        #     predict(im,st)
        # else:
        predict2(im,st)

        
        image.close()
       

if __name__ == '__main__':
    main()