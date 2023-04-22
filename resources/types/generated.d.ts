declare namespace App.Data {
    export type UserData = {
        address: string;
    };

    export type NftData = {
        title: string;
        thumbnail: string;
        collection_name: string;
        collection_image: string | null;
        collection_website: string | null;
    };
}
