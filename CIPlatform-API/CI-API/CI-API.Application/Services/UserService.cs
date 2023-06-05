using CI_API.Application.ServiceInterface;
using CI_API.Core.Models;
using CI_API.Core.ViewModel;
using CI_API.Data.Interface;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CI_API.Application.Services
{
   
    public class UserService : IUserService
    {

        #region Dependency Injection of UserRepository Interface
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        #endregion

        #region Login
        public JsonResult Login(LoginViewModel userDetail)
        {
            
            return _userRepository.Login(userDetail); 
        }
        #endregion

        #region Register
        public JsonResult Register(RegisterViewModel userDetail)
        {

            return _userRepository.RegisterUser(userDetail); 
        }
        #endregion

        #region GetAllUser
        public List<User> GetAllUser()
        {

            return _userRepository.GetAllUser();
        }
        #endregion

        #region ForgetPassword

        public JsonResult ForgetPassword(string email)
        {
            return _userRepository.ForgetPassword(email);
        }
        #endregion

        #region ResetPassword

        public JsonResult ResetPassword(string email, string token, string newPassword)
        {
            return _userRepository.ResetPassword(email, token, newPassword);    

        }
        #endregion


    }
}
