CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "citext";

CREATE TABLE IF NOT EXISTS users (
id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
username citext UNIQUE NOT NULL,
email citext UNIQUE NOT NULL,
password TEXT NOT NULL,
admin BOOLEAN NOT NULL DEFAULT false
);

CREATE UNIQUE INDEX IF NOT EXISTS users_username_idx ON users (username);

-- password = 123456
INSERT INTO users (username, email, password, admin) VALUES ('admin', 'admin@admin', 'aa3a66a433e54be45fc2a38711a28875320b6852e47a16cbd9f752f6112805d6a9eba733b991633b84082ed973139e9f923cc79cb02731ac842d56800e57fe29', TRUE) ON CONFLICT (username) DO NOTHING;
