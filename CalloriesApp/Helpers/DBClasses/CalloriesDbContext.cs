using CalloriesApp.Models;
using Microsoft.EntityFrameworkCore;
using System;

namespace CalloriesApp.Helpers.DBClasses
{
    public class CalloriesDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<MealHistory> MealHistories { get; set; }
        public DbSet<Dish> Dishes { get; set; }

        public CalloriesDbContext(DbContextOptions<CalloriesDbContext> options) : base(options)
        {
           
             
            
           
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<DishProduct>()
                .HasKey(dp => new { dp.DishId, dp.ProductId });

            modelBuilder.Entity<DishProduct>()
                .HasOne(dp => dp.Dish)
                .WithMany(d => d.DishProducts)
                .HasForeignKey(dp => dp.DishId);

            modelBuilder.Entity<DishProduct>()
                .HasOne(dp => dp.Product)
                .WithMany(p => p.DishProducts)
                .HasForeignKey(dp => dp.ProductId);

            modelBuilder.Entity<MealHistory>()
                .HasOne(mh => mh.Product)
                .WithMany(p => p.MealHistories)
                .HasForeignKey(mh => mh.ProductId);

            modelBuilder.Entity<MealHistory>()
                .HasOne(mh => mh.Dish)
                .WithMany(d => d.MealHistories)
                .HasForeignKey(mh => mh.DishId);

            modelBuilder.Entity<MealHistory>()
                .HasOne(mh => mh.User)
                .WithMany(u => u.MealHistories)
                .HasForeignKey(mh => mh.UserId);
            
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.LogTo(Console.WriteLine);
        }
    }
}
