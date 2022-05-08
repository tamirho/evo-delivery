export type DistanceMatrix = {
    [key: string]: DistanceMatrixRowData;
};

export type DistanceMatrixRowData = {
    [key: string]: DistanceMatrixColumnData
}

export type DistanceMatrixColumnData = {
    distance: DistanceMatrixAttributes;
    duration: DistanceMatrixAttributes;
}

export type DistanceMatrixAttributes = { text: string, value: number };
