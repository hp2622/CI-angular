﻿using CI_API.Application.ServiceInterface;
using Microsoft.AspNetCore.Mvc;

namespace CI_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LandingPageController : ControllerBase
    {

        #region Dependancy Injection
        private readonly ILandingPageService landingPageService;

        public LandingPageController(ILandingPageService _landingPageService)
        {
            landingPageService = _landingPageService;
        }
        #endregion

        [HttpGet]
        public async Task<JsonResult> LandingPage()
        {
            return landingPageService.LandingPage();

            //return new JsonResult(new apiResponse<string> { Message = ResponseMessages.InternalServerError, StatusCode = responseStatusCode.BadRequest, Result = false });
        }

    }
}
