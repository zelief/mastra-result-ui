"use client";

import { useState } from "react";
import { ImageGallery } from "@/components/image-gallery";

const sampleJson = `{
  "results": [
    {
      "platform_id": "1",
      "item_id": "962057275472",
      "title": "泡泡玛特labubu拉布布搪胶脸摆件马卡龙一代毛绒玩具公仔手办萌",
      "image_url": "https://cbu01.alicdn.com/O1CN01bxJgYJ1QRgWE6y44p_!!2220417991973-0-cib.jpg",
      "price_range": "19.00",
      "moq": 0,
      "supplier_id": "b2b-222041799197352628",
      "supplier_name": "宿州周米米电子商务有限公司",
      "supplier_region": "CN"
    },
    {
      "platform_id": "1",
      "item_id": "963912092500",
      "title": "泡泡马特拉布布一代毛绒公仔盲盒搪胶娃娃玩具LABUBU潮玩偶马卡龙",
      "image_url": "https://cbu01.alicdn.com/O1CN01Ivqvlo1s2mDkIoqmi_!!2220450045709-0-cib.jpg",
      "price_range": "20.60",
      "moq": 1,
      "supplier_id": "b2b-222045004570929eee",
      "supplier_name": "天长市甜梦玩具有限公司",
      "supplier_region": "CN"
    },
    {
      "platform_id": "1",
      "item_id": "961219738981",
      "title": "泡泡玛特labubu拉布布搪胶脸摆件马卡龙一代毛绒玩具公仔手办萌",
      "image_url": "https://cbu01.alicdn.com/O1CN01htTqpJ1wubE7yboOG_!!2220374186368-0-cib.jpg",
      "price_range": "19.00",
      "moq": 0,
      "supplier_id": "b2b-222037418636856412",
      "supplier_name": "淮北常多多电子商务有限公司",
      "supplier_region": "CN"
    },
    {
      "platform_id": "1",
      "item_id": "939787664683",
      "title": "现货拉布布三代泡泡 马卡龙坐坐搪胶毛绒盲盒玩偶盲盒毛绒挂件",
      "image_url": "https://cbu01.alicdn.com/O1CN01ylq0Vh1CyI5sIEM2L_!!2219493330149-0-cib.jpg",
      "price_range": "29.90",
      "moq": 0,
      "supplier_id": "b2b-221949333014996c52",
      "supplier_name": "义乌市清欢日用品商行",
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

interface DuplicateGroup {
    imageUrls: string[];
    reason: string;
}

interface DuplicateResult {
    duplicates: DuplicateGroup[];
}

export default function ProductDedupPage() {
    const [jsonInput, setJsonInput] = useState(sampleJson);
    const [threshold, setThreshold] = useState(0.7);
    const [method, setMethod] = useState('mobilenet');
    const [products, setProducts] = useState<Product[]>([]);
    const [duplicateGroups, setDuplicateGroups] = useState<DuplicateGroup[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const findDuplicates = async () => {
        setLoading(true);
        setError('');
        try {
            const data: ProductData = JSON.parse(jsonInput);
            setProducts(data.results);
            
            // Transform to the required input format
            const productData = data.results.map(product => ({
                title: product.title,
                price: product.price_range,
                image_url: product.image_url
            }));

            const response = await fetch(`${process.env.NEXT_PUBLIC_MASTRA_API_URL}/api/tools/find-product-duplicates/execute`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    data: { products: productData, threshold, method }
                })
            });
            const result: DuplicateResult = await response.json();
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
                    <h1 className="text-3xl font-bold mb-2">Product Duplicate Finder</h1>
                    <p className="text-muted-foreground">
                        Find duplicate products using title, price, and image analysis
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
                        <div className="mb-4 flex gap-4">
                            <div>
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
                            <div>
                                <label className="block text-sm font-medium mb-2">Method:</label>
                                <select
                                    value={method}
                                    onChange={(e) => setMethod(e.target.value)}
                                    className="p-2 border rounded"
                                >
                                    <option value="mobilenet">MobileNet</option>
                                    <option value="gemini">Gemini</option>
                                </select>
                            </div>
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
                                    <h3 className="text-lg font-medium mb-2">Group {index + 1} ({group.imageUrls.length} products)</h3>
                                    <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded">
                                        <p className="text-sm font-medium text-blue-800 mb-1">Why these are duplicates:</p>
                                        <p className="text-sm text-blue-700">{group.reason}</p>
                                    </div>
                                    <div className="space-y-4">
                                        {group.imageUrls.map((imageUrl, idx) => {
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