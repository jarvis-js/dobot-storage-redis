# Redis Storage

Store bot data in a Redis key-value store.

## Configuration

### [hostname]

Hostname of the Redis server.  Defaults to `localhost`.

### [port]

Port of the Redis server.  Defaults to `6379`.

### [password]

Password used to connect to the Redis server.  Defaults to `null`.

### [key_prefix]

Prefix of the key name used to store the data.  Defaults to `dobot:storage:`.
