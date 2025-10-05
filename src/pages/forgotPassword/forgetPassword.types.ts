export type TUserByEmail = {
  _id: string;
  name: {
    firstName: string;
    lastName: string;
  };
  profileImage?: string;
};

export type TTimerhandler = {
  reset: () => void;
};

export type TEmail = {
  email: string;
};

export type TVerifyOtpProps = {
  userInfo: TUserByEmail;
  timerRef: React.RefObject<TTimerhandler>;
  handleSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    otpNum: string[],
    setIsExpired: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<any>;
  resendOTP: ({
    setLoad,
    setIsExpired,
  }: {
    setLoad: React.Dispatch<React.SetStateAction<boolean>>;
    setIsExpired: React.Dispatch<React.SetStateAction<boolean>>;
  }) => Promise<void>;
  handleLocalStorage?: () => void;
  handleBackHome?: () => void;
  handleSkip?: (
    setIsExpired: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<void>;
};
