﻿using System.ComponentModel.DataAnnotations;

namespace CalloriesApp.Models
{
    public class MealHistory
    {
        [Key]
        public int MealHistoryId { get; set; }

        public int? ProductId { get; set; }
        public virtual Product Product { get; set; }

        public int? DishId { get; set; }
        public virtual Dish Dish { get; set; }

        public int? UserId { get; set; }
        public virtual User User { get; set; }

        [Required(ErrorMessage = "Meal date and time are required.")]
        public DateTime MealDateTime { get; set; }
    }
}
