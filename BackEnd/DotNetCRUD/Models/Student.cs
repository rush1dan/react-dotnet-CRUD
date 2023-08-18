using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DotNetCRUD.Models
{
    public class Student
    {
        [Key]
        public int id { get; set; }
        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string name { get; set; }
        public int age { get; set; }
        public int inClass { get; set; }
        [Column(TypeName = "nvarchar(3)")]
        public string grades { get; set; }
    }
}
