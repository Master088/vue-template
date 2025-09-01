import axiosInstance from '@/services/axiosInstanceService';

async function fetchFile(src, signal = null) {
  try {
    const res = await axiosInstance.get(`static/assets/private/${src}/`, {
      responseType: "blob",
      timeout: 0, // No timeout to handle large files
      signal, // Allows request cancellation
      headers: {
        ...axiosInstance.defaults.headers, // Ensure default headers are included
        "Cache-Control": "no-store, no-cache, must-revalidate",
        "Pragma": "no-cache",
      },
    });

    return window.URL.createObjectURL(res.data);
  } catch (err) {
    if (axiosInstance.isCancel(err)) {
      console.warn(`❌ Request for ${src} was cancelled`);
    } else {
      console.error(`❌ Failed to fetch: ${src}`, err);
    }
    return null;
  }
}

export default fetchFile;
