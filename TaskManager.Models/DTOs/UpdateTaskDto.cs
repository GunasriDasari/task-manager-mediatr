using System.ComponentModel.DataAnnotations;

namespace TaskManager.Models.DTOs
{
    public class UpdateTaskDto
    {
        [Required]
        [StringLength(100)]
        public string Title { get; set; }

        [Required]
        [StringLength(250)]
        public string Description { get; set; }

        public bool IsCompleted { get; set; }

    }
}
