﻿using System.ComponentModel.DataAnnotations;

namespace CalloriesApp.Models.ViewModels
{
    public class UserLoginModel
    {
        [Required(ErrorMessage = "The Login field is required.")]
        public string Login { get; set; }

        [Required(ErrorMessage = "The Password field is required.")]
        public string Password { get; set; }
    }
}
