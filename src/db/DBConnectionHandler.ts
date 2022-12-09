interface DBConnectionHandler {
    connect(): Promise<void>
}