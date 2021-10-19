using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CameronJChurch.Data.Migrations
{
    public partial class Exercise : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ExerciseActivity",
                columns: table => new
                {
                    ExerciseActivityId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ExerciseActivityName = table.Column<string>(type: "TEXT", nullable: true),
                    ExerciseActivityUnit = table.Column<string>(type: "TEXT", nullable: true),
                    Count = table.Column<decimal>(type: "TEXT", nullable: false),
                    UserName = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExerciseActivity", x => x.ExerciseActivityId);
                });

            migrationBuilder.CreateTable(
                name: "ExerciseActivityDay",
                columns: table => new
                {
                    ExerciseActivityDayId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Date = table.Column<DateTime>(type: "TEXT", nullable: false),
                    ExerciseActivityId = table.Column<int>(type: "INTEGER", nullable: true),
                    Count = table.Column<int>(type: "INTEGER", nullable: false),
                    UserName = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExerciseActivityDay", x => x.ExerciseActivityDayId);
                    table.ForeignKey(
                        name: "FK_ExerciseActivityDay_ExerciseActivity_ExerciseActivityId",
                        column: x => x.ExerciseActivityId,
                        principalTable: "ExerciseActivity",
                        principalColumn: "ExerciseActivityId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ExerciseActivityDay_ExerciseActivityId",
                table: "ExerciseActivityDay",
                column: "ExerciseActivityId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ExerciseActivityDay");

            migrationBuilder.DropTable(
                name: "ExerciseActivity");
        }
    }
}
