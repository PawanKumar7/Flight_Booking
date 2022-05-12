﻿// <auto-generated />
using System;
using AirlineService.DataModel;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace AirlineService.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.14-servicing-32113")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("AirlineService.DataModel.AirlineModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Address");

                    b.Property<string>("Contact")
                        .IsRequired();

                    b.Property<string>("Name")
                        .IsRequired();

                    b.Property<string>("Status");

                    b.HasKey("Id");

                    b.ToTable("Airlinetbl");
                });

            modelBuilder.Entity("AirlineService.DataModel.DiscountModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<double>("Amount");

                    b.Property<string>("DiscountCode");

                    b.Property<DateTime>("EndDate");

                    b.Property<DateTime>("StartDate");

                    b.HasKey("Id");

                    b.ToTable("Discounttbl");
                });

            modelBuilder.Entity("AirlineService.DataModel.FlightSheduleModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("AirlineId");

                    b.Property<decimal>("BcTicketCost")
                        .HasConversion(new ValueConverter<decimal, decimal>(v => default(decimal), v => default(decimal), new ConverterMappingHints(precision: 38, scale: 17)))
                        .HasColumnType("decimal(18,2)");

                    b.Property<DateTime>("EndDateTime");

                    b.Property<string>("FromPlace")
                        .IsRequired();

                    b.Property<string>("InstrumentUsed");

                    b.Property<string>("MealType");

                    b.Property<decimal>("NBcTicketCost")
                        .HasConversion(new ValueConverter<decimal, decimal>(v => default(decimal), v => default(decimal), new ConverterMappingHints(precision: 38, scale: 17)))
                        .HasColumnType("decimal(18,2)");

                    b.Property<string>("SheduledDay");

                    b.Property<DateTime>("StartDateTime");

                    b.Property<string>("ToPlace")
                        .IsRequired();

                    b.Property<int>("TotalBCSeats");

                    b.Property<int>("TotalNBCSeats");

                    b.HasKey("Id");

                    b.HasIndex("AirlineId");

                    b.ToTable("Flight_shedule_tbl");
                });

            modelBuilder.Entity("AirlineService.DataModel.Passenger", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("Age");

                    b.Property<int>("BookingId");

                    b.Property<string>("Gender")
                        .IsRequired();

                    b.Property<string>("PassengerName")
                        .IsRequired();

                    b.Property<int>("SeatNo");

                    b.HasKey("Id");

                    b.HasIndex("BookingId");

                    b.ToTable("Passengertbl");
                });

            modelBuilder.Entity("AirlineService.DataModel.UserBookingModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("BookingStatus");

                    b.Property<string>("ClassType");

                    b.Property<int>("DiscountId");

                    b.Property<string>("EmailId")
                        .IsRequired();

                    b.Property<int>("FlightId");

                    b.Property<string>("JourneyType");

                    b.Property<int>("NoOfSeats");

                    b.Property<string>("PNR");

                    b.Property<DateTime?>("ReturnDate");

                    b.Property<double>("TotalCost");

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("DiscountId");

                    b.HasIndex("FlightId");

                    b.HasIndex("UserId");

                    b.ToTable("Bookingtbl");
                });

            modelBuilder.Entity("AirlineService.DataModel.UserModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Email");

                    b.Property<string>("Gender");

                    b.Property<bool>("IsAdmin");

                    b.Property<string>("Password");

                    b.Property<string>("UserName");

                    b.HasKey("Id");

                    b.ToTable("User");
                });

            modelBuilder.Entity("AirlineService.DataModel.FlightSheduleModel", b =>
                {
                    b.HasOne("AirlineService.DataModel.AirlineModel", "airlinemodel")
                        .WithMany()
                        .HasForeignKey("AirlineId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("AirlineService.DataModel.Passenger", b =>
                {
                    b.HasOne("AirlineService.DataModel.UserBookingModel", "bookingmodel")
                        .WithMany("PassengerList")
                        .HasForeignKey("BookingId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("AirlineService.DataModel.UserBookingModel", b =>
                {
                    b.HasOne("AirlineService.DataModel.DiscountModel", "discountmodel")
                        .WithMany()
                        .HasForeignKey("DiscountId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("AirlineService.DataModel.FlightSheduleModel", "flightmodel")
                        .WithMany()
                        .HasForeignKey("FlightId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("AirlineService.DataModel.UserModel", "usermodel")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
