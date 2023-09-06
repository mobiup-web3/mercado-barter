<?php
/**
 * Global Configuration Override
 *
 * You can use this file for overriding configuration values from modules, etc.
 * You would place values in here that are agnostic to the environment and not
 * sensitive to security.
 *
 * @NOTE: In practice, this file will typically be INCLUDED in your source
 * control, so do not include passwords or other sensitive information in this
 * file.
 */

return [
    'db' => [
        'username' => 'mobiup_barter',
        'password' => 'Barter!2#',
        'dsn' => 'mysql:dbname=mobiup_barter;host=172.96.172.56',
        'driver' => 'Pdo',
        'driver_options' => [
            \PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES \'UTF8\'',
        ],
    ],
    'base_url'          => 'https://mercado-barter.mobiup.io',
    'email_contato'     => 'erick.queiroz@mobiup.com.br',
    'env'               => 'dev',
    'chain_id'          => 80001,
    'web3'              => [
        'url' => 'https://compiler-smart-contract.web.app'
    ],
    'mail' => [
        'name' => 'mobiup',
        'connectionClass' => 'login',
        'host' => 'mobiup.io',
        'port' => 587,
        'connection_config' => [
            'username' => 'support@mobiup.io',
            'password' => 'Mobiup!@#',
            'from' => 'nao-responder@mobiup.io',
            'ssl' => 'tls',
            'report_error_log' => 'erickqueiroz93@gmail.com'
        ],
    ],
    'infura_nets'       => [
        '5' => [
            'key'                   => '3ac68be0e4f44833bce00d483f3bd104',
            'endpoint'              => 'https://goerli.infura.io/v3/',
            'url'                   => 'https://goerli.infura.io/v3/3ac68be0e4f44833bce00d483f3bd104',
            'url_network'           => 'https://goerli.etherscan.io/',
            'scan'                  => 'https://goerli.etherscan.io/tx/',
            'address'               => 'https://goerli.etherscan.io/address/',
            'token'                 => 'https://goerli.etherscan.io/token/',
            'chain_id'              => 5,
            'crypto'                => 'ETH',
            'network_name'          => 'Goerli Testnet',
            'rpc_urls'              => 'https://goerli.infura.io/v3/',
            'block_explorer_urls'   => 'https://goerli.etherscan.io',
            'decimal'               => 18,
            'hexa'                  => '0x5',
            'opensea'               => 'https://testnets.opensea.io/assets/goerli/'
        ],
        '1' => [
            'key'                   => '3ac68be0e4f44833bce00d483f3bd104',
            'endpoint'              => 'https://mainnet.infura.io/v3/',
            'url'                   => 'https://mainnet.infura.io/v3/3ac68be0e4f44833bce00d483f3bd104',
            'url_network'           => 'https://etherscan.io/',
            'scan'                  => 'https://etherscan.io/tx/',
            'address'               => 'https://etherscan.io/address/',
            'token'                 => 'https://etherscan.io/token/',
            'chain_id'              => 1,
            'crypto'                => 'ETH',
            'network_name'          => 'Ethereum Mainnet',
            'rpc_urls'              => 'https://mainnet.infura.io/v3/',
            'block_explorer_urls'   => 'https://etherscan.io',
            'decimal'               => 18,
            'hexa'                  => '0x1',
            'opensea'               => 'https://testnets.opensea.io/assets/ethereum/'
        ],
        '137' => [
            'key'                   => '3ac68be0e4f44833bce00d483f3bd104',
            'endpoint'              => 'https://polygon-mainnet.infura.io/v3/',
            'url'                   => 'https://polygon-mainnet.infura.io/v3/3ac68be0e4f44833bce00d483f3bd104',
            'url_network'           => 'https://polygonscan.com/',
            'scan'                  => 'https://polygonscan.com/tx/',
            'address'               => 'https://polygonscan.com/address/',
            'token'                 => 'https://polygonscan.com/token/',
            'chain_id'               => 137,
            'crypto'                => 'MATIC',
            'network_name'          => 'Polygon',
            'rpc_urls'              => 'https://polygon-rpc.com',
            'block_explorer_urls'   => 'https://polygonscan.com',
            'decimal'               => 18,
            'hexa'                  => '0x89',
            'opensea'               => 'https://opensea.io/assets/matic/'
        ],
        '80001' => [
            'key'                   => '3ac68be0e4f44833bce00d483f3bd104',
            'endpoint'              => 'https://polygon-mumbai.infura.io/v3/',
            'url'                   => 'https://polygon-mumbai.infura.io/v3/3ac68be0e4f44833bce00d483f3bd104',
            'url_network'           => 'https://mumbai.polygonscan.com/',
            'scan'                  => 'https://mumbai.polygonscan.com/tx/',
            'address'               => 'https://mumbai.polygonscan.com/address/',
            'token'                 => 'https://mumbai.polygonscan.com/token/',
            'chain_id'              => 80001,
            'crypto'                => 'MATIC',
            'network_name'          => 'Mumbai Polygon',
            'rpc_urls'              => 'https://rpc-mumbai.maticvigil.com',
            'block_explorer_urls'   => 'https://mumbai.polygonscan.com',
            'decimal'               => 18,
            'hexa'                  => '0x13881',
            'opensea'               => 'https://testnets.opensea.io/assets/mumbai/'
        ],
    ],
];
