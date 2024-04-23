document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('fileInput');
    const addButton = document.getElementById('addButton');
    const imageContainer = document.getElementById('imageContainer');

    fileInput.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = new Image();
                img.src = e.target.result;
                img.style.maxWidth = '200px';
                img.style.maxHeight = '200px';
                imageContainer.innerHTML = '';
                imageContainer.appendChild(img);
            }
            reader.readAsDataURL(file);
        }
    });

    addButton.addEventListener('click', function() {
        const selectedFile = fileInput.files[0];
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const base64Image = e.target.result.split(',')[1];
                const img = new Image();
                img.src = e.target.result;
                img.style.maxWidth = '200px';
                img.style.maxHeight = '200px';
                const card = document.createElement('div');
                card.appendChild(img);
                document.body.appendChild(card);

                axios.post('API_URL', { image: base64Image })
                    .then(response => {
                        console.log('API response:', response.data);
                    })
                    .catch(error => {
                        console.error('API error:', error);
                    });
            }
            reader.readAsDataURL(selectedFile);
        } else {
            console.log('No file selected.');
        }
    });
});