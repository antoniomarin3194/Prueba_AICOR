<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            // Laptops
            ['name' => 'Laptop Dell XPS 13', 'description' => 'Laptop ultraportátil con procesador Intel i7', 'price' => 1299.99, 'stock' => 15],
            ['name' => 'MacBook Pro 16"', 'description' => 'Laptop profesional con M3 Max', 'price' => 2499.99, 'stock' => 8],
            ['name' => 'Laptop HP Pavilion 15', 'description' => 'Laptop versátil Intel i5', 'price' => 699.99, 'stock' => 12],
            ['name' => 'Laptop Asus VivoBook 15', 'description' => 'Laptop económica Ryzen 5', 'price' => 549.99, 'stock' => 18],
            ['name' => 'Laptop Lenovo ThinkPad', 'description' => 'Laptop profesional empresarial', 'price' => 899.99, 'stock' => 10],
            ['name' => 'Laptop MSI GE66 Gaming', 'description' => 'Laptop gaming RTX 4070', 'price' => 1799.99, 'stock' => 6],
            ['name' => 'MacBook Air M2', 'description' => 'Laptop ultralight Apple', 'price' => 1199.99, 'stock' => 11],
            ['name' => 'Laptop Acer Swift 3', 'description' => 'Laptop ultraligero 14"', 'price' => 649.99, 'stock' => 14],
            
            // Monitores
            ['name' => 'Monitor Dell 4K 27"', 'description' => 'Monitor IPS con resolución 4K', 'price' => 599.99, 'stock' => 8],
            ['name' => 'Monitor LG 32" Curved', 'description' => 'Monitor curvo para gaming', 'price' => 449.99, 'stock' => 10],
            ['name' => 'Monitor BenQ ZOWIE 24"', 'description' => 'Monitor gaming 240Hz', 'price' => 299.99, 'stock' => 16],
            ['name' => 'Monitor ASUS ProArt PA248QV', 'description' => 'Monitor profesional 24" color', 'price' => 299.99, 'stock' => 7],
            ['name' => 'Monitor ViewSonic VP2458', 'description' => 'Monitor IPS 60Hz 24"', 'price' => 249.99, 'stock' => 12],
            ['name' => 'Monitor Ultrawide LG 34"', 'description' => 'Monitor ultraancho 3440x1440', 'price' => 699.99, 'stock' => 5],
            ['name' => 'Monitor Wacom Pen Display 16"', 'description' => 'Monitor gráfico para profesionales', 'price' => 799.99, 'stock' => 4],
            ['name' => 'Monitor ASUS TUF 27" 165Hz', 'description' => 'Monitor gaming 1440p', 'price' => 349.99, 'stock' => 9],
            
            // Teclados
            ['name' => 'Teclado mecánico RGB', 'description' => 'Teclado gaming con switches Cherry MX', 'price' => 149.99, 'stock' => 25],
            ['name' => 'Teclado Logitech Mechanical', 'description' => 'Teclado mecánico inalámbrico', 'price' => 179.99, 'stock' => 18],
            ['name' => 'Teclado Corsair K95 Platinum', 'description' => 'Teclado gaming premium RGB', 'price' => 229.99, 'stock' => 12],
            ['name' => 'Teclado Razer DeathStalker', 'description' => 'Teclado bajo perfil gaming', 'price' => 99.99, 'stock' => 20],
            ['name' => 'Teclado SteelSeries Apex 5', 'description' => 'Teclado gaming mecánico', 'price' => 119.99, 'stock' => 16],
            ['name' => 'Teclado Keychron K8 Pro', 'description' => 'Teclado mecánico inalámbrico', 'price' => 99.99, 'stock' => 22],
            ['name' => 'Teclado Leopold FC900R', 'description' => 'Teclado mecánico premium', 'price' => 159.99, 'stock' => 10],
            ['name' => 'Teclado Kinesis Advantage Pro', 'description' => 'Teclado ergonómico mecánico', 'price' => 319.99, 'stock' => 5],
            
            // Ratones
            ['name' => 'Ratón Logitech MX Master 3S', 'description' => 'Ratón inalámbrico profesional', 'price' => 99.99, 'stock' => 18],
            ['name' => 'Ratón Razer DeathAdder V3', 'description' => 'Ratón gaming ultraligero', 'price' => 69.99, 'stock' => 28],
            ['name' => 'Ratón SteelSeries Rival 3', 'description' => 'Ratón gaming sensible', 'price' => 49.99, 'stock' => 35],
            ['name' => 'Ratón Corsair DARK CORE RGB', 'description' => 'Ratón inalámbrico gaming', 'price' => 79.99, 'stock' => 22],
            ['name' => 'Ratón Apple Magic Mouse', 'description' => 'Ratón inalámbrico para Mac', 'price' => 79.99, 'stock' => 15],
            ['name' => 'Ratón Logitech MX Anywhere 3S', 'description' => 'Ratón portátil inalámbrico', 'price' => 79.99, 'stock' => 20],
            ['name' => 'Ratón HyperX Pulsefire Haste', 'description' => 'Ratón gaming ligero', 'price' => 59.99, 'stock' => 25],
            ['name' => 'Ratón Finalmouse UltralightX', 'description' => 'Ratón gaming ultraligero', 'price' => 69.99, 'stock' => 18],
            
            // Almacenamiento
            ['name' => 'SSD Samsung 990 Pro 2TB', 'description' => 'Unidad SSD NVMe ultrarrápida', 'price' => 249.99, 'stock' => 15],
            ['name' => 'SSD WD Black SN850X 1TB', 'description' => 'SSD gaming ultrarrápido', 'price' => 129.99, 'stock' => 20],
            ['name' => 'SSD SK Hynix P41 1TB', 'description' => 'SSD NVMe de alto rendimiento', 'price' => 119.99, 'stock' => 18],
            ['name' => 'SSD Kingston NV2 1TB', 'description' => 'SSD compacto económico', 'price' => 89.99, 'stock' => 30],
            ['name' => 'Disco duro WD Blue 4TB', 'description' => 'HDD almacenamiento 7200RPM', 'price' => 99.99, 'stock' => 22],
            ['name' => 'Disco duro Seagate Barracuda 2TB', 'description' => 'HDD para PC escritorio', 'price' => 79.99, 'stock' => 25],
            ['name' => 'Disco duro portable Seagate 2TB', 'description' => 'HDD externo portátil', 'price' => 89.99, 'stock' => 28],
            ['name' => 'SSD portátil Samsung T7 Shield', 'description' => 'SSD externo resistente 2TB', 'price' => 239.99, 'stock' => 12],
            
            // Memoria RAM
            ['name' => 'Memoria RAM Corsair DDR5 32GB', 'description' => 'Memoria RAM gaming de alto rendimiento', 'price' => 179.99, 'stock' => 10],
            ['name' => 'Memoria RAM G.Skill DDR5 64GB', 'description' => 'RAM de alta capacidad 6000MHz', 'price' => 299.99, 'stock' => 6],
            ['name' => 'Memoria RAM Kingston DDR5 32GB', 'description' => 'RAM económica DDR5', 'price' => 159.99, 'stock' => 12],
            ['name' => 'Memoria RAM Crucial DDR5 32GB', 'description' => 'RAM confiable DDR5', 'price' => 149.99, 'stock' => 14],
            ['name' => 'Memoria RAM ADATA DDR5 16GB', 'description' => 'RAM single channel DDR5', 'price' => 89.99, 'stock' => 20],
            ['name' => 'Memoria RAM Patriot DDR5 32GB', 'description' => 'RAM gaming DDR5', 'price' => 179.99, 'stock' => 8],
            ['name' => 'Memoria RAM Intel Optane 32GB', 'description' => 'RAM cache acelerador', 'price' => 249.99, 'stock' => 4],
            
            // Componentes GPU
            ['name' => 'NVIDIA RTX 4090', 'description' => 'GPU de gama alta profesional', 'price' => 1599.99, 'stock' => 3],
            ['name' => 'NVIDIA RTX 4080', 'description' => 'GPU gaming de alta gama', 'price' => 999.99, 'stock' => 5],
            ['name' => 'NVIDIA RTX 4070 Ti', 'description' => 'GPU gaming equilibrada', 'price' => 699.99, 'stock' => 8],
            ['name' => 'AMD Radeon RX 7900 XTX', 'description' => 'GPU AMD gama alta', 'price' => 749.99, 'stock' => 6],
            ['name' => 'NVIDIA RTX 4070', 'description' => 'GPU gaming versátil', 'price' => 549.99, 'stock' => 10],
            ['name' => 'Intel Arc A770', 'description' => 'GPU Intel de entrada', 'price' => 329.99, 'stock' => 12],
            
            // Periféricos
            ['name' => 'Mousepad XXL', 'description' => 'Mousepad grande para gaming', 'price' => 39.99, 'stock' => 35],
            ['name' => 'Mousepad SteelSeries QcK', 'description' => 'Mousepad profesional gaming', 'price' => 29.99, 'stock' => 40],
            ['name' => 'Soporte universal para laptop', 'description' => 'Soporte ajustable de aluminio', 'price' => 49.99, 'stock' => 28],
            ['name' => 'Organizador de cables', 'description' => 'Set de 10 organizadores silicona', 'price' => 12.99, 'stock' => 80],
            ['name' => 'Reposabrazos ergonómico', 'description' => 'Soporte para brazos escritorio', 'price' => 59.99, 'stock' => 20],
            ['name' => 'Refrigerador laptop', 'description' => 'Ventilador de refrigeración USB', 'price' => 34.99, 'stock' => 25],
            
            // Audio
            ['name' => 'Micrófono Blue Yeti', 'description' => 'Micrófono USB de condensador', 'price' => 129.99, 'stock' => 12],
            ['name' => 'Micrófono Shure SM7B', 'description' => 'Micrófono profesional XLR', 'price' => 399.99, 'stock' => 5],
            ['name' => 'Auriculares Sony WH-1000XM5', 'description' => 'Auriculares con cancelación ruido', 'price' => 399.99, 'stock' => 10],
            ['name' => 'Auriculares SteelSeries Arctis Nova', 'description' => 'Auriculares gaming inalámbricos', 'price' => 249.99, 'stock' => 8],
            ['name' => 'Altavoz Logitech UE Boom 3', 'description' => 'Altavoz Bluetooth portátil', 'price' => 149.99, 'stock' => 15],
            
            // Cables y conectores
            ['name' => 'Cable USB-C', 'description' => 'Cable de carga rápida 100W', 'price' => 19.99, 'stock' => 100],
            ['name' => 'Cable HDMI 2.1', 'description' => 'Cable 4K 60Hz 3 metros', 'price' => 12.99, 'stock' => 55],
            ['name' => 'Cable DisplayPort 1.4', 'description' => 'Cable para monitor 8K', 'price' => 14.99, 'stock' => 45],
            ['name' => 'Adaptador USB Hub 7 puertos', 'description' => 'Hub multifunción para USB-C', 'price' => 39.99, 'stock' => 50],
            ['name' => 'Dock Thunderbolt 4', 'description' => 'Estación de acoplamiento profesional', 'price' => 199.99, 'stock' => 6],
            ['name' => 'Adaptador Lightning USB-C', 'description' => 'Adaptador oficial Apple', 'price' => 29.99, 'stock' => 30],
            
            // Fuentes de poder
            ['name' => 'Fuente 850W 80+ Gold', 'description' => 'Fuente modular para gaming', 'price' => 129.99, 'stock' => 14],
            ['name' => 'Fuente 1000W 80+ Platinum', 'description' => 'Fuente profesional modular', 'price' => 199.99, 'stock' => 8],
            ['name' => 'Fuente 650W 80+ Bronze', 'description' => 'Fuente económica', 'price' => 79.99, 'stock' => 20],
            
            // Refrigeración
            ['name' => 'Disipador CPU Noctua NH-D15', 'description' => 'Disipador torre de aire', 'price' => 99.99, 'stock' => 10],
            ['name' => 'Disipador CPU Corsair H150i Elite', 'description' => 'Refrigeración líquida AIO', 'price' => 179.99, 'stock' => 8],
            ['name' => 'Ventilador NZXT Kraken X73', 'description' => 'Enfriador líquido de 360mm', 'price' => 199.99, 'stock' => 6],
            
            // Carcasas
            ['name' => 'Carcasa NZXT H7 Flow', 'description' => 'Carcasa gaming con flujo aire', 'price' => 149.99, 'stock' => 10],
            ['name' => 'Carcasa Corsair 5000T', 'description' => 'Carcasa Airflow premium', 'price' => 299.99, 'stock' => 5],
            ['name' => 'Carcasa Lian Li O11 Dynamic', 'description' => 'Carcasa modular gaming', 'price' => 149.99, 'stock' => 8],
            
            // Placas madre
            ['name' => 'Placa ASUS ROG Strix Z790', 'description' => 'Motherboard premium Intel', 'price' => 299.99, 'stock' => 6],
            ['name' => 'Placa MSI MPG B550', 'description' => 'Motherboard Ryzen 5000', 'price' => 199.99, 'stock' => 9],
            ['name' => 'Placa Gigabyte Z790', 'description' => 'Motherboard gaming Intel', 'price' => 259.99, 'stock' => 7],
            
            // Procesadores
            ['name' => 'Intel Core i9-13900K', 'description' => 'CPU gaming de gama alta', 'price' => 589.99, 'stock' => 4],
            ['name' => 'Intel Core i7-13700K', 'description' => 'CPU equilibrada para gaming', 'price' => 399.99, 'stock' => 7],
            ['name' => 'AMD Ryzen 9 7950X', 'description' => 'CPU AMD de gama alta', 'price' => 549.99, 'stock' => 5],
            ['name' => 'AMD Ryzen 7 7700X', 'description' => 'CPU Ryzen 7000 series', 'price' => 349.99, 'stock' => 8],
            
            // Cámaras web
            ['name' => 'Webcam Logitech C920', 'description' => 'Cámara web Full HD', 'price' => 79.99, 'stock' => 20],
            ['name' => 'Webcam Razer Kiyo Pro', 'description' => 'Cámara web 1080p lowlight', 'price' => 199.99, 'stock' => 10],
            ['name' => 'Webcam Corsair K60 Pro', 'description' => 'Cámara 1080p para streaming', 'price' => 129.99, 'stock' => 8],
            
            // Iluminación
            ['name' => 'Lámpara LED de escritorio', 'description' => 'Lámpara ajustable sin parpadeos', 'price' => 44.99, 'stock' => 40],
            ['name' => 'Tira LED RGB inteligente', 'description' => 'LED WiFi controlable por app', 'price' => 34.99, 'stock' => 45],
            ['name' => 'Anillo de luz LED', 'description' => 'Ring light para streaming', 'price' => 49.99, 'stock' => 30],
        ];

        foreach ($products as $product) {
            Product::create([
                'name' => $product['name'],
                'description' => $product['description'],
                'price' => $product['price'],
                'stock' => $product['stock'],
                'image_url' => 'https://api.dicebear.com/7.x/avataaars/svg?seed=antonio3',
            ]);
        }
    }
}
