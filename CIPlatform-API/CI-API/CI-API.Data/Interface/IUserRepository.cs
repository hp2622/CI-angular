using CI_API.Core.Models;
using CI_API.Core.ViewModel;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CI_API.Data.Interface
{
    public interface IUserRepository
    {
        #region Method of UserRepository
        public JsonResult Login(LoginViewModel userDetail);
        public List<User> GetAllUser();
        public JsonResult RegisterUser(RegisterViewModel userDetail);
        public JsonResult ForgetPassword(string email);
        public JsonResult ResetPassword(string email, string token, string newPassword);

        #endregion
    }
}
