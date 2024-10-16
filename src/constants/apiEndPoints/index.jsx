export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
 // export const API_BASE_URL = "http://192.168.1.51:8001/";
 // export const API_BASE_URL = "http://localhost:8001/";

 console.log(`check + ${import.meta.env.VITE_API_BASE_URL}`);
// protected Route
export const PROTECTED = '/api/v1/user/protected';

// Signup
export const SIGNUP = '/api/v1/user/register';

// Otp
export const OTP_VERIFY = '/api/v1/user/verify';

// Main user APIS

export const MAIN_LOGIN = '/api/v1/user/login';
export const UPDATE_USER = '/api/v1/user';
export const CREATWE_SUB_USER = '/api/v1/user/create-subuser';
export const GET_SUB_USERS = '/api/v1/user/subusers';
export const UPDATE_SUB_USER_STATUS = '/api/v1/user/subusers/status';
export const DELETE_SUB_USER = '/api/v1/user/subusers';
export const GET_SUB_USER = '/api/v1/user/subusers/single';
export const UPDATE_SUB_USER = '/api/v1/user/subusers';
export const GET_USER_MEDIAS = '/api/v1/media';
export const UPLOAD_MEDIA = '/api/v1/media/upload';
export const UPDATE_MEDIA = '/api/v1/media/edit';
export const DELETE_MEDIA = '/api/v1/media/remove';
export const FORGOT_PASSWORD = '/api/v1/user/forgot-password';
export const RESET_PASSWORD = '/api/v1/user/reset-password';


// Sub Users

export const SUB_LOGIN = '/api/v1/user/member/login';
export const VERIFY_OTP = '/api/v1/user/member/verify-otp';
export const GET_MEMBER_USER_MEDIAS = '/api/v1/user/member/media';
export const UPDATE_MEMBER_USER = '/api/v1/user/member/update';
export const CONTACT_US = '/api/v1/contact';

// Tags

export const BUY_TAG = 'api/v1/tag/activate';
export const GET_TAG_URL = 'api/v1/tag';
export const GET_PUBLIC_TAG_URL = 'api/v1/tag/public';
export const UPLOAD_TAG_URL = 'api/v1/tag/upload';
export const EDIT_TAG_URL = 'api/v1/tag/edit';
export const DELETE_TAG_URL = 'api/v1/tag/remove';
export const GET_USER_TAG_DATA = 'api/v1/user';
