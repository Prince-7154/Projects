
from skimage.draw import line
from scipy import ndimage
from scipy.ndimage import morphology



def houghLines(img):
    w, h = img.shape
    acc = []
    for i in range(h):
        rr, cc = line(0, i, w-1, h-i-1)
        acc.append(np.sum(img[rr, cc]))
    mi = np.argmax(acc)
    ret = np.zeros(img.shape, dtype=bool)
    rr, cc = line(0, mi, w-1, h-mi-1)
    ret[rr, cc] = True
    return ret

def lines_removal(img):

    imggray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    imfft = np.fft.fft2(imggray)
    imffts = np.fft.fftshift(imfft)
    mags = np.abs(imffts)
    angles = np.angle(imffts)
    visual = np.log(mags)
    visual3 = np.abs(visual.astype(np.int16) - np.mean(visual))

    ret = houghLines(visual3)
    ret = morphology.binary_dilation(ret)
    ret = morphology.binary_dilation(ret)
    ret = morphology.binary_dilation(ret)
    ret = morphology.binary_dilation(ret)
    ret = morphology.binary_dilation(ret)
    w, h = ret.shape
    ret[w//2-3:w//2+3, h//2-3:h//2+3] = False

    delta = np.mean(visual[ret]) - np.mean(visual)
    visual_blured = ndimage.gaussian_filter(visual, sigma=5)
    visual[ret] = visual_blured[ret]
    newmagsshift = np.exp(visual)
    newffts = newmagsshift * np.exp(1j*angles)
    newfft = np.fft.ifftshift(newffts)
    imrev = np.fft.ifft2(newfft)
    newim2 = np.abs(imrev).astype(np.uint8)

    gray = newim2.copy()
    newim2 = cv2.cvtColor(newim2, cv2.COLOR_GRAY2RGB)
    newim2 = np.maximum(newim2, img)
    img = newim2
    return img,gray

