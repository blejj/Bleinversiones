using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Bleinversiones.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Operaciones_Usuarios_usuarioIdUsuario",
                table: "Operaciones");

            migrationBuilder.DropColumn(
                name: "Comision",
                table: "Operaciones");

            migrationBuilder.AlterColumn<int>(
                name: "usuarioIdUsuario",
                table: "Operaciones",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Operaciones_Usuarios_usuarioIdUsuario",
                table: "Operaciones",
                column: "usuarioIdUsuario",
                principalTable: "Usuarios",
                principalColumn: "IdUsuario");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Operaciones_Usuarios_usuarioIdUsuario",
                table: "Operaciones");

            migrationBuilder.AlterColumn<int>(
                name: "usuarioIdUsuario",
                table: "Operaciones",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "Comision",
                table: "Operaciones",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddForeignKey(
                name: "FK_Operaciones_Usuarios_usuarioIdUsuario",
                table: "Operaciones",
                column: "usuarioIdUsuario",
                principalTable: "Usuarios",
                principalColumn: "IdUsuario",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
