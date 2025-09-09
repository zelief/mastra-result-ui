"use client";

import { useState } from "react";
import { ImageGallery } from "@/components/image-gallery";


const sampleJson = `{
  "results": [
    {
      "platform_id": "1",
      "item_id": "788270605643",
      "title": "旋转拖把桶套装家用2023新款双驱动免手洗一拖净吸水墩布干湿两用",
      "image_url": "https://cbu01.alicdn.com/O1CN01yRh6WE1kjLzBcwPLP_!!2216521214719-0-cib.jpg",
      "price_range": "40.00",
      "moq": 0,
      "supplier_id": "b2b-22165212147198a6d7",
      "supplier_name": "霸州市多旺厚金属制品厂",
      "supplier_region": "CN"
    },
    {
      "platform_id": "1",
      "item_id": "820970671544",
      "title": "加厚升级版拖把免手洗家用自拧水旋转拖把家用带桶一拖净拖布批发",
      "image_url": "https://cbu01.alicdn.com/O1CN01MaI3TR1qJ92YUsIpm_!!2217815875474-0-cib.jpg",
      "price_range": "53.10",
      "moq": 0,
      "supplier_id": "b2b-2217815875474e65c8",
      "supplier_name": "慕川家(义乌市)家居用品有限公司",
      "supplier_region": "CN"
    }
  ]
}`;

interface Product {
    platform_id: string;
    item_id: string;
    title: string;
    image_url: string;
    price_range: string;
    moq: number;
    supplier_id: string;
    supplier_name: string;
    supplier_region: string;
}

interface ProductData {
    results: Product[];
    total_count?: number;
}

export default function GalleryDemoPage() {
    const [jsonInput, setJsonInput] = useState(sampleJson);
    const [threshold, setThreshold] = useState(0.6);
    const [products, setProducts] = useState<Product[]>([]);
    const [duplicateGroups, setDuplicateGroups] = useState<string[][]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const findDuplicates = async () => {
        setLoading(true);
        setError('');
        try {
            const data: ProductData = JSON.parse(jsonInput);
            setProducts(data.results);
            const urls = data.results.map(product => product.image_url);
            
            const response = await fetch(`${process.env.NEXT_PUBLIC_MASTRA_API_URL}/api/tools/find-image-duplicates/execute`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    data: { urls, threshold }
                })
            });
            const result = await response.json();
            setDuplicateGroups(result.duplicates || []);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Invalid JSON or API error');
        }
        setLoading(false);
    };

    const getProductByImageUrl = (imageUrl: string) => {
        return products.find(p => p.image_url === imageUrl);
    };

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Image Duplicate Finder</h1>
                    <p className="text-muted-foreground">
                        Find duplicate images using AI similarity detection
                    </p>
                </div>

                <div className="space-y-8">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Product Data (JSON):</label>
                            <textarea 
                                value={jsonInput} 
                                onChange={(e) => setJsonInput(e.target.value)}
                                rows={12}
                                className="w-full p-3 border rounded-lg font-mono text-sm"
                                placeholder="Enter product JSON data..."
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Threshold (0-1):</label>
                            <input 
                                type="number" 
                                min="0" 
                                max="1" 
                                step="0.1"
                                value={threshold}
                                onChange={(e) => setThreshold(Number(e.target.value))}
                                className="w-32 p-2 border rounded"
                            />
                        </div>
                        {error && <div className="mb-4 text-red-600 text-sm">{error}</div>}
                        <button 
                            onClick={findDuplicates}
                            disabled={loading}
                            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                        >
                            {loading ? 'Finding...' : 'Find Duplicates'}
                        </button>
                    </div>

                    {products.length > 0 && (
                        <section>
                            <h2 className="text-xl font-semibold mb-4">Products ({products.length})</h2>
                            <ImageGallery images={products.map(p => p.image_url)} />
                        </section>
                    )}

                    {duplicateGroups.length > 0 && (
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Duplicate Groups ({duplicateGroups.length})</h2>
                            {duplicateGroups.map((group, index) => (
                                <div key={index} className="mb-8 bg-white p-6 rounded-lg shadow">
                                    <h3 className="text-lg font-medium mb-4">Group {index + 1} ({group.length} products)</h3>
                                    <div className="space-y-4">
                                        {group.map((imageUrl, idx) => {
                                            const product = getProductByImageUrl(imageUrl);
                                            return (
                                                <div key={idx} className="flex gap-4 p-4 border rounded">
                                                    <img src={imageUrl} alt="Product" className="w-24 h-24 object-cover rounded" />
                                                    {product && (
                                                        <div className="flex-1">
                                                            <h4 className="font-medium text-sm mb-2">{product.title}</h4>
                                                            <p className="text-sm text-gray-600">Price: ¥{product.price_range}</p>
                                                            <p className="text-sm text-gray-600">Supplier: {product.supplier_name}</p>
                                                            <p className="text-sm text-gray-600">Item ID: {product.item_id}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
