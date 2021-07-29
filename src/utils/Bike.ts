export default interface Bike {
    date_stolen: number;
    description: string;
    frame_colors: [string];
    frame_model: string;
    id: number;
    large_img: string;
    manufacturer_name: string;
    registry_name: string;
    stolen: boolean;
    stolen_location: string;
    thumb: string;
    title: string;
    url: string;
    year: number;
    stolen_record: {
        latitude: number;
        longitude: number;
        location: string;
        theft_description: string;
    };
}
