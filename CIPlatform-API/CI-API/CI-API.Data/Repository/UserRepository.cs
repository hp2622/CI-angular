using CI_API.Core.CIDbContext;
using CI_API.Core.Models;
using CI_API.Core.ViewModel;
using CI_API.Data.Interface;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using CI_API.Common.CommonModels;
using CI_API.Common.CommonMethods;

namespace CI_API.Data.Repository
{
    public class UserRepository : IUserRepository
    {

        #region Dependency Injection of DbContext 

        private readonly CipContext _cIDbContext;

        public UserRepository(CipContext cIDbContext)
        {
            _cIDbContext = cIDbContext;
        }
        #endregion

        #region Login

        public JsonResult Login(LoginViewModel userDetail)
        {
            User loginData = _cIDbContext.Users.Where(U => U.Email == userDetail.email && U.Password == userDetail.password).FirstOrDefault();
            string token = "";
            if (loginData != null)
            {
                token = CommonMethods.CreateJwt(loginData);
                return new JsonResult(new apiResponse<string> { Message = ResponseMessages.LoginSuccess, StatusCode = responseStatusCode.Success, Data = token, Result = true });

            }
            else if (_cIDbContext.Users.Where(U => U.Email == userDetail.email) == null)
            {
                return new JsonResult(new apiResponse<string> { Message = ResponseMessages.UserNotFound, StatusCode = responseStatusCode.NotFound, Result = false });
            }
            else
            {
                return new JsonResult(new apiResponse<string> { Message = ResponseMessages.InvalidLoginCredentials, StatusCode = responseStatusCode.InvalidData, Result = false });

            }


        }

        #endregion

        #region Register

        public JsonResult RegisterUser(RegisterViewModel userDetail)
        {
            var userExist = _cIDbContext.Users.Where(U => U.Email == userDetail.email).FirstOrDefault();
            if (userExist != null)
            {
                return new JsonResult(new apiResponse<string> { Message = ResponseMessages.UserAlreadyExist, StatusCode = responseStatusCode.AlreadyExist, Result = false });

            }
            else
            {
                User user = new User()
                {
                    FirstName = userDetail.firstName,
                    LastName = userDetail.lastName,
                    Email = userDetail.email,
                    Password = userDetail.password,
                    PhoneNumber = (long)userDetail.phoneNumber,
                };
                _cIDbContext.Add(user);
                _cIDbContext.SaveChanges();
                return new JsonResult(new apiResponse<string> { Message = ResponseMessages.RegistrationSuccess, StatusCode = responseStatusCode.Success, Result = true });

            }


        }

        #endregion

        #region ForgetPassword
        public JsonResult ForgetPassword(string email)
        {
            var userExists = _cIDbContext.Users.Where(U => U.Email == email).FirstOrDefault();

            if (userExists != null)
            {
                PasswordReset requestExists = _cIDbContext.PasswordResets.Where(P => P.Email == email).FirstOrDefault();
                if (requestExists != null)
                {
                    _cIDbContext.PasswordResets.Remove(requestExists);
                }

                string tokenAfterMailSent = CommonMethods.SendEmailForPasswordReset(email,userExists);

                if (tokenAfterMailSent != "Email not sent")
                {
                    PasswordReset passwordReset = new PasswordReset()
                    {
                        Email = email,
                        Token = tokenAfterMailSent,
                    };

                    _cIDbContext.Add(passwordReset);
                    var abc = _cIDbContext.SaveChanges();
                    return new JsonResult(new apiResponse<string> { Message = ResponseMessages.EmailSentSuccessfully, StatusCode = responseStatusCode.Success, Result = true });
                }
                else
                {
                    return new JsonResult(new apiResponse<string> { Message = ResponseMessages.EmailNotSend, StatusCode = responseStatusCode.BadRequest, Result = false });
                }


            }

            else
            {
                return new JsonResult(new apiResponse<string> { Message = ResponseMessages.UserNotFound, StatusCode = responseStatusCode.NotFound, Result = false });
            }

        }

        #endregion

        #region ResetPassword
        public JsonResult ResetPassword(string email, string token, string newPassword)
        {
            User? userExist = _cIDbContext.Users.Where(U => U.Email == email).FirstOrDefault();

            if (userExist != null)
            {

                var tokenExists = _cIDbContext.PasswordResets.Where(R => R.Token == token && R.Email == email).FirstOrDefault();

                if (tokenExists != null)
                {
                    if (tokenExists.CreatedAt.AddMinutes(1) > DateTime.Now)
                    {
                        User? user = _cIDbContext.Users.Where(U => U.Email == email).FirstOrDefault();

                        user.Password = newPassword;

                        PasswordReset? passwordReset = _cIDbContext.PasswordResets.Where(R => R.Email == email).FirstOrDefault();

                        _cIDbContext.PasswordResets.Remove(passwordReset);
                        _cIDbContext.SaveChanges();


                        return new JsonResult(new apiResponse<string> { Message = ResponseMessages.PasswordResetSuccess, StatusCode = responseStatusCode.Success, Result = true });
                    }
                    else
                    {
                        PasswordReset? passwordReset = _cIDbContext.PasswordResets.Where(R => R.Email == email).FirstOrDefault();

                        _cIDbContext.PasswordResets.Remove(passwordReset);
                        _cIDbContext.SaveChanges();
                        return new JsonResult(new apiResponse<string> { Message = ResponseMessages.LinkExpired, StatusCode = responseStatusCode.InvalidData, Result = false });
                    }
                }
                else
                {

                    return new JsonResult(new apiResponse<string> { Message = ResponseMessages.LinkExpired, StatusCode = responseStatusCode.InvalidData, Result = false });
                }
            }
            else
            {
                return new JsonResult(new apiResponse<string> { Message = ResponseMessages.UserNotFound, StatusCode = responseStatusCode.NotFound, Result = false });

            }
        }

        #endregion

        #region GetAllUser

        public List<User> GetAllUser()
        {
            var loginData = _cIDbContext.Users.ToList();

            return loginData;
        }
        #endregion
    }
}
