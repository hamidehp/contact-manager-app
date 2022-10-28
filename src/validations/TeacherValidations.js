import * as yup from 'yup';

export const teacherSchema=yup.object().shape(
{fullname:yup.string().required("نام و نام خانوادگی الزامی است"),
 mobile:yup.number().required("شماره موبایل الزامی است"),
 photo:yup.string().url("آدرس معتبر نیست").required("آدرس الزامی است"),
 email:yup.string().email("ایمیل معتبر نیست").required("آدرس ایمیل الزامی است"),
 job:yup.string().nullable(),
 group:yup.string().required("انتخاب گروه الزامیست")
}




);
