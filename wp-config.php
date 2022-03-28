<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'wordpress_db' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '+F=w^;r*Y$7:]vRJA6G|Gy(>*|t6NM[48u$Q{2O%wVD?$:IIb^SUQvP`wVfaJ;TY' );
define( 'SECURE_AUTH_KEY',  '}d8$q48-9y?`)^TnxHeZM4Y~9WiiEL_zf{1;0X2!SI~*=q%*(ZSbXnm-Vvi8p`{q' );
define( 'LOGGED_IN_KEY',    '# s``])hXvO4j5-,r r{<[a,Xa>LR0d%]Ey+VJI02F7% 3M+z&#h|| %7fDU#$ht' );
define( 'NONCE_KEY',        '(Ts8yso9Nl]G+?g_-6Fn2jNC-6fD?*VQQd;x^;)xw@j-0*0L?YP#sv_R_[M8F6`T' );
define( 'AUTH_SALT',        'b+e+0l ^XAHwA#]iFxf.2V`Zj}cS+09.iM*mX?c?_R?DKAXo@kLj|?T$W.~0bD}o' );
define( 'SECURE_AUTH_SALT', ']PzoyXQ(+l(]2-sWY+2>>$rQ WAy/MkU2F=/$J%&@IMw!Am/*@6yB}xC2W:{K7PY' );
define( 'LOGGED_IN_SALT',   'RPUVSQPjo;&7Fk=_krb*MFTfUYrmq 9I124^?us#]|9?D_kH8u/{ur&wzi1cy(H;' );
define( 'NONCE_SALT',       'a_0xw,T{;D$JTVCzA~E.x^BR/zxpoXly`G?E]3UFZVW8u#|{Ygu|$2sCm&4[QZfN' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
