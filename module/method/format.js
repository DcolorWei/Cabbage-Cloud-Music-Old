function RowDataPacketToJson(RowDataPacket) {
    let result = {};
    for (const key in RowDataPacket) result[key] = RowDataPacket[key]
    return result;
}


exports.RowDataPacketToJson = RowDataPacketToJson;