function toggleVideo(id) {
      const video = document.getElementById(id);
      if (video.style.display === "none" || video.style.display === "") {
        video.style.display = "block";
      } else {
        video.style.display = "none";
      }
    }