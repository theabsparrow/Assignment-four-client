import { useMyProfileQuery } from "@/redux/features/user/userApi";

const useMyProfile = (fields?: string[]) => {
  const { data, error, isLoading, refetch } = useMyProfileQuery(undefined);
  const myProfile =
    fields && data?.data
      ? fields.reduce((acc, field) => {
          if (data?.data[field] !== undefined) {
            acc[field] = data?.data[field];
          }
          return acc;
        }, {} as Record<string, unknown>)
      : data?.data;
  return { myProfile, error, isLoading, refetch };
};

export default useMyProfile;
