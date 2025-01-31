﻿using System.ComponentModel.DataAnnotations;

namespace CalloriesApp.Models
{
    public class Dish
    {
        [Key]
        public int DishId { get; set; }

        [Required(ErrorMessage = "Name is required.")]
        [StringLength(100, ErrorMessage = "Name must not exceed 100 characters.")]
        public string Name { get; set; }

        [Range(0, double.MaxValue, ErrorMessage = "Weight must be a non-negative value.")]
        public double Weight { get; set; }

        public virtual ICollection<DishProduct> DishProducts { get; set; }

        public virtual ICollection<MealHistory> MealHistories { get; set; }

        public Dish()
        {
            DishProducts = new List<DishProduct>();
            MealHistories = new List<MealHistory>();
        }
    }
}
