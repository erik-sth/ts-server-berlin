export default function () {
    if (!process.env.MONGODB_URI) {
        console.error('FATAL ERROR: MONGODB_URI is not defiended');
        process.exit(1);
    }
}
