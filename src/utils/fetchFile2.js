import axiosInstance from "@/services/axiosInstanceService";

async function fetchFile2(id) {
  try {
    const res = await axiosInstance.get(`task-attachment/${id}/download`, {
      responseType: "blob",
      headers: {
        Range: "bytes=0-", // Enable partial content streaming
      },
    });

    if (res.status === 206 || res.status === 200) {
      return window.URL.createObjectURL(res.data);
    } else {
      console.error("Unexpected response status:", res.status);
      return null;
    }
  } catch (err) {
    console.error("Error fetching video file:", err.response?.status, err.message);
    return null;
  }
}

export default fetchFile2;
