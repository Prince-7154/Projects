import cv2
import numpy as np
import math
import os
from rulinglineremoval import lines_removal
def remove_blankspace(image):
    gray=cv2.cvtColor(image,cv2.COLOR_BGR2GRAY)
    _,thresh=cv2.threshold(gray,180,255,cv2.THRESH_BINARY_INV)
    coords=cv2.findNonZero(thresh)
    x, y, w, h = cv2.boundingRect(coords)
    return gray[y:y+h,x:x+w]
def preprocess_image(image,height=120):
    img=cv2.cvtColor(image,cv2.COLOR_BGR2GRAY)
    thresh= cv2.adaptiveThreshold(img, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY_INV, 41, 21)
    coords=cv2.findNonZero(thresh)
    x, y, w, h = cv2.boundingRect(coords)
    img=img[y:y+h,x:x+w]
    h,w=img.shape
    width=math.ceil((w/h)*height)
    resized=cv2.resize(img,(width,height),interpolation=cv2.INTER_AREA)
    thresh= cv2.adaptiveThreshold(resized, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY_INV, 41, 21)
    thresh = thresh.astype(np.float32)
    thresh /= 255
    thresh = np.expand_dims(thresh, axis=-1)
    #segmentation

    return thresh
def resizeandnormalize(image,height=120):
    h,w=image.shape
    width=math.ceil((w/h)*height)
    resized=cv2.resize(image,(width,height),interpolation=cv2.INTER_AREA)
    # resized[resized>30]=255     
    _,resized=cv2.threshold(resized,40,255,cv2.THRESH_BINARY)
    # resized[]=
    resized = resized.astype(np.float32)
    resized /= 255
    resized = np.expand_dims(resized, axis=-1)
    # st.write(f'{int(mask= (resized>0) & (resized<1))}')
    
    return resized
def line_extraction(img):
    for i in range(5):
        img,gray=lines_removal(img)
    img = cv2.GaussianBlur(img, (1, 1), 0)
    im = cv2.GaussianBlur(img, (5, 5), 0)
    gray=cv2.cvtColor(im,cv2.COLOR_BGR2GRAY)
    gray2=cv2.cvtColor(img,cv2.COLOR_BGR2GRAY)
    

    thresh = cv2.adaptiveThreshold(gray, 255, cv2.ADAPTIVE_THRESH_MEAN_C, 
                            cv2.THRESH_BINARY_INV, 41, 21)
    
    thresh1= cv2.adaptiveThreshold(gray2, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY, 41,10)

    img=cv2.cvtColor(thresh1,cv2.COLOR_GRAY2BGR)

   
    images=[]
    while not np.all(thresh == 0):
        dialated=cv2.dilate(thresh,np.ones((10,3),np.uint8))
        contours, _ = cv2.findContours(dialated, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        ct=[]
        for x in contours:
            if cv2.contourArea(x)>20:
                    ct.append(x)

        ct = sorted(ct, key=lambda x: cv2.boundingRect(x)[1])
        if len(ct)==0:
            break
        cur=ct[0]
        x,y,w,h=cv2.boundingRect(cur)
        baseline=y+h
        cts=[]
        ep=baseline
        st=y
        reg=[]
        for i in ct:
            x,y,w,h=cv2.boundingRect(i)
            if y<baseline:
                if y+h>ep:
                    ep=y+h
                if y>st:
                    st=y
                cts.append(i)
            else:
                reg.append(i)


        while True:
            t=[]
            f=0

            for i in reg:
                x,y,w,h=cv2.boundingRect(i)
                if (y+h<=ep) or y<st+(ep-st)//2:
                    if y+h>ep:
                        ep=y+h
                    if y>st:
                        st=y
                    f=1

                    cts.append(i)
                else:
                    t.append(i)
            reg=t
            if f==0: break

        ct_image=img.copy()
        cv2.drawContours(ct_image, cts, -1, (0, 255, 0), -1)

        blank_image = np.ones_like(img)*255

        mask = np.zeros_like(gray)
        cv2.drawContours(mask, cts, -1, (255, 255, 255), -1)

        blank_image[mask == 255] = img[mask == 255]
        fm=np.invert(base_line_correction(remove_blankspace(blank_image)))
        # fm=np.invert(remove_blankspace(blank_image))
        if fm.shape[0]>35 and fm.shape[1]>200:
            images.append(resizeandnormalize(fm))
        thresh[mask==255]=0
    return images


def line_extraction2(image):
    for i in range(5):
        image,gray=lines_removal(image)
    gray=cv2.cvtColor(image,cv2.COLOR_BGR2GRAY)
    thresh= cv2.adaptiveThreshold(gray, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY_INV, 41, 21)
    images=[]
    imgs=[]

    for i, row in enumerate(thresh):

        if np.all(row == 0):
            if len(imgs)==0:
                pass
            else:
                n=np.array(imgs)
                if n.shape[0]>20:
                    coords=cv2.findNonZero(np.array(imgs)) # Find all non-zero points (text)
                    x, y, w, h = cv2.boundingRect(coords)
            
             
                    images.append(resizeandnormalize(n[y:y+h,x:x+w]))
                imgs=[]
        else:
            imgs.append(thresh[i])
    if len(imgs)!=0:
         n=np.array(imgs)
         if n.shape[0]>20:
                coords=cv2.findNonZero(np.array(imgs)) # Find all non-zero points (text)
                x, y, w, h = cv2.boundingRect(coords)
        
            
                images.append(resizeandnormalize(n[y:y+h,x:x+w]))
    return images
def generate_patches(image,patch_size=120):
    slide_size=patch_size//4
    patches=[]


    for i in range(0,image.shape[1],slide_size):

        patch=image[:,i:i+patch_size]
        h,w,c=patch.shape
        
        if w<patch_size:
                patch=cv2.copyMakeBorder(patch, 0, 0, 0, patch_size-w, cv2.BORDER_CONSTANT, value=0)
                patch = np.expand_dims(patch, axis=-1)
        if cv2.countNonZero(patch):
             
                patches.append(patch)

    return patches
def generate_patches2(image,patch_size=120):
    image=np.squeeze(image,axis=-1)
    image=image.astype(np.uint8)*255
    # _,thresh=cv2.threshold(image,180,255,cv2.THRESH_BINARY)
    dialated=cv2.dilate(image,np.ones((6,10),np.uint8))
    (cnt,hierarchy)=cv2.findContours(dialated,cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_NONE)
    image = image.astype(np.float32)
    image /= 255
    segs=[]
    for i in cnt:
         if cv2.contourArea(i)<100: continue
         x,y,w,h=cv2.boundingRect(i)
         word=image[y:y+h,x:w+x]
         coords=cv2.findNonZero(word) # Find all non-zero points (text)
         x, y, w, h = cv2.boundingRect(coords)
         word=word[y:y+h,x:w+x]
         h,w=word.shape
         width=math.ceil((w/h)*patch_size)
         resized=cv2.resize(word,(width,patch_size),interpolation=cv2.INTER_AREA)
         resized = np.expand_dims(resized, axis=-1)
         segs.append(resized)
    slide_size=patch_size//4
    patches=[]
   
    for img in segs:
        for i in range(0,img.shape[1],slide_size):

            patch=img[:,i:i+patch_size]
            h,w,c=patch.shape
            
            if w<patch_size:
                    patch=cv2.copyMakeBorder(patch, 0, 0, 0, patch_size-w, cv2.BORDER_CONSTANT, value=0)
                    patch = np.expand_dims(patch, axis=-1)
            patches.append(patch)

    return patches

def base_line_detection(image):

    dilate=cv2.dilate(image,kernel=np.ones((10,5),np.uint8),iterations=2)
    coords=cv2.findNonZero(image)
    x, y, w, h = cv2.boundingRect(coords)
    
    binimg=(dilate.copy().astype(np.float32))/255
    histogram = np.sum(binimg, axis=1)
    kernel_size = 30
    kernel = np.ones(kernel_size) / kernel_size

    # Convolve the signal with the kernel
    histogram = np.convolve(histogram, kernel, mode='same')
    for i in range(max(np.argmax(histogram),y+h//3),len(histogram)):
        if histogram[i]<10: return i
        if histogram[i]<0.4*np.max(histogram) and len(np.where(histogram[i:]>45*np.max(histogram))[0])==0:
            return i



    return y+h

def base_line_correction(gray):
    _,thresh=cv2.threshold(gray,180,255,cv2.THRESH_BINARY_INV)
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (10, 8))
    dilate = cv2.dilate(thresh, kernel, iterations=5)
    imgs=[]
    r=[]
    ind=[]
    threshold=np.transpose(thresh)
    for i,row in enumerate(np.transpose(dilate)):
        if np.all(row == 0):
            if len(r)==0:
                pass
            else:
                imgs.append(np.transpose(np.array(r)))
                r=[]
        else:
            if len(r)==0:
                    ind.append(i)
            r.append(threshold[i])
    if len(r)!=0:
        imgs.append(np.transpose(np.array(r)))
    blank_image=np.zeros_like(gray)
    h,w=gray.shape
    offset=500
    blank_image=cv2.copyMakeBorder(blank_image, offset, offset, 0, 0, cv2.BORDER_CONSTANT, value=0)
    base=base_line_detection(imgs[0])
    h,w=imgs[0].shape
    blank_image[offset:offset+h,ind[0]:ind[0]+w]=imgs[0]
    for i,img in enumerate(imgs[1:]):
        bline=base_line_detection(img)
        diff=offset+(base-bline)
        h,w=img.shape

        blank_image[diff:diff+h,ind[i+1]:ind[i+1]+w]=img
    coords=cv2.findNonZero(blank_image) 
    x, y, w, h = cv2.boundingRect(coords)
    blank_image=blank_image[y:y+h,x:x+w]
    blank_image=(blank_image==0).astype(np.uint8)*255
    
    return blank_image
