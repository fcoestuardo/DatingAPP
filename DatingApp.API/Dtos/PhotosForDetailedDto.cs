using System;

namespace DatingApp.API.Dtos
{
    public class PhotosForDetailedDto
    {
        public int id { get; set; }
        public string url { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        public bool IsMain { get; set; }
    }
}