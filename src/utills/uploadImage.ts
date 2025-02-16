import { config } from "@/config";
import axios from "axios";

export const imageUpload = async (image: File): Promise<string> => {
  const formData = new FormData();
  formData.append("image", image);
  const { data } = await axios.post(config.imgbb_api, formData);
  return data.data.display_url;
};
