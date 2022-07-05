import DashLayout from "../components/dashLayout";
import { useFormik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import * as Yup from "yup";
import apiFunc from "../services/api";

export default function ChangePasswordPage(props) {
  const initialValues = {
    password: "",
    confirmPassword: "",
    oldPassword: "",
  };
  const validationSchema = Yup.object({
    password: Yup.string().required("Please enter new password"),
    oldPassword: Yup.string().required("Please enter old password"),
    confirmPassword: Yup.mixed()
      .required("Please enter confirm password")
      .test(
        "match",
        "Your new password and confirm password does not match",
        (value) => {
          if (value == undefined || value == null) {
            return false;
          }
          return value && value == formik.getFieldProps().value.password;
        }
      ),
  });
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log("submit", values);
      changePassword(values);
    },
  });
  function changePassword(data) {
    apiFunc
      .postChangePassword(data)
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((error) => {
        var message = JSON.parse(error.request.response).message;
        toast.error(message);
      });
  }
  return (
    <>
      <DashLayout props={props}>
        <div className="description_right">
          <div className=" change_password_web">
            <div className="form_middle">
              <div className="comman_from">
                <h5> Change Password </h5>
                <form className="change_pass" onSubmit={formik.handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label"> Old Password </label>
                    <input
                      type="password"
                      {...formik.getFieldProps("oldPassword")}
                      className="form-control"
                      placeholder="Enter Current old password"
                    />
                    {formik.touched.oldPassword && formik.errors.oldPassword ? (
                      <div className="errorMsg">
                        {formik.errors.oldPassword}
                      </div>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <label className="form-label"> Password </label>
                    <input
                      type="password"
                      {...formik.getFieldProps("password")}
                      className="form-control"
                      placeholder="Enter Current Password"
                    />
                    {formik.touched.password && formik.errors.password ? (
                      <div className="errorMsg">{formik.errors.password}</div>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <label className="form-label"> Confirm Password </label>
                    <input
                      type="password"
                      {...formik.getFieldProps("confirmPassword")}
                      className="form-control"
                      placeholder="Enter New Password"
                    />
                    {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword ? (
                      <div className="errorMsg">
                        {formik.errors.confirmPassword}
                      </div>
                    ) : null}
                  </div>
                  <button type="submit" className="btn cus_btn custom01">
                    {" "}
                    Save{" "}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </DashLayout>
    </>
  );
}
