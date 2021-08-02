export default function randomImage(): string {
    const images = [
        "https://files.bikeindex.org/uploads/Pu/462122/large_IMG_7180.JPG",
        "https://files.bikeindex.org/uploads/Pu/462225/large_54068740-FAD8-4F89-A523-B944D180C550.jpeg",
        "https://files.bikeindex.org/uploads/Pu/462176/large_Reid_mint_green_bike.png",
        "https://files.bikeindex.org/uploads/Pu/462171/large_20210526_234128.jpg",
        "https://files.bikeindex.org/uploads/Pu/417692/large_20210408_143209.jpg"
    ];

    const randomIndex = Math.floor(Math.random() * (images.length - 1));
    return images[randomIndex];
}