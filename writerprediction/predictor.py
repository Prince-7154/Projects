import pickle
from CCTmodel import *
from ImageProcessing import *
from PIL import Image
md=pickle.load(open(r'model/model.pickle','rb'))
svm=md['classifier']
names=md['names']
cct_model=keras.models.load_model("model/feature.h5",custom_objects={"ConvolutionalTokenizer":ConvolutionalTokenizer})
cct_model2=keras.models.load_model("model/model.h5",custom_objects={"ConvolutionalTokenizer":ConvolutionalTokenizer})

def predict(image,st=None):
    lines=line_extraction(image)

        
    pred=[]
    for i in lines:
        patches=generate_patches(i)
        if st!=None:
            st.image(Image.fromarray(np.invert(np.squeeze(i,axis=-1).astype(np.uint8)*255)), caption='Line', use_column_width=True)
            # for x in patches:
            #     st.image(Image.fromarray(np.invert(np.squeeze(x,axis=-1).astype(np.uint8)*255)), caption='Line', use_column_width=True)

        p=np.average(cct_model.predict(np.array(patches)),axis=0)
        print(len(svm.predict(np.array([p]))))
        name=names[svm.predict(np.array([p]))[0]]
        if st!=None:
            st.write(f"<center style='font-size:24px;margin-bottom:20px;'><b>Writer: {name}</b></center>", unsafe_allow_html=True)
   
   

    return pred
def predict2(image,st=None):
    
    lines=line_extraction(image)

        
    pred=[]
    ps=[]
    for i in lines:
        patches=generate_patches(i)
        if st!=None:
            st.image(Image.fromarray(np.invert(np.squeeze(i,axis=-1).astype(np.uint8)*255)), caption='Line', use_column_width=True)
          
        pd=cct_model2.predict(np.array(patches))
        p=np.average(pd,axis=0)
        ps.append(p)
        name=names[np.argmax(p)]
        if st!=None:
            st.write(f"<center style='font-size:24px;margin-bottom:20px;'><b>Writer: {name} ({np.max(p)*100})</b></center>", unsafe_allow_html=True)
            txt="\n".join([f"{names[o]}: {p[o]*100}" for o in np.argsort(p)[::-1]])
         
        pred.append(name)
    av=np.average(np.array(ps),axis=0)
    if st!=None:
            txt="\n".join([f"{names[o]}: {av[o]*100}" for o in np.argsort(av)[::-1]])
            st.write(f"<center style='font-size:24px;margin-bottom:20px;'><b>Overall Writer: {names[np.argmax(av)]} ({np.max(av)*100})</b></center>", unsafe_allow_html=True)
            

    return pred
if __name__=="__main__":
    print(predict(cv2.imread('manojs.jpg')))