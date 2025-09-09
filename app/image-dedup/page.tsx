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
    },
    {
      "platform_id": "1",
      "item_id": "954279243328",
      "title": "现货labubu拉布布心动马卡龙盲盒坐坐公仔毛绒派对搪胶潮玩批发",
      "image_url": "https://cbu01.alicdn.com/O1CN01jkjLwY1pEji5BW1ab_!!2220256125329-0-cib.jpg",
      "price_range": "12.99",
      "moq": 0,
      "supplier_id": "b2b-222025612532913f56",
      "supplier_name": "义乌市狄畅电子商务商行",
      "supplier_region": "CN"
    },
    {
      "platform_id": "1",
      "item_id": "939318705466",
      "title": "泡泡玛特同款LABUBU马卡龙2代坐坐派对搪胶毛绒公仔盲盒挂件",
      "image_url": "https://cbu01.alicdn.com/O1CN01E1Gyka2AxiWoocC8z_!!2219494688270-0-cib.jpg",
      "price_range": "199.9",
      "moq": 1,
      "supplier_id": "b2b-2219494688270189f3",
      "supplier_name": "东阳市乔白电子商务商行",
      "supplier_region": "CN"
    },
    {
      "platform_id": "1",
      "item_id": "920949233512",
      "title": "新款17cm玩偶娃衣复古蕾丝纱裙kitty着替拉布布公仔换装衣服批发",
      "image_url": "https://cbu01.alicdn.com/O1CN01JWTGII1ZJkAQ2x5Rd_!!2215112443174-0-cib.jpg",
      "price_range": "3.90",
      "moq": 1,
      "supplier_id": "b2b-2215112443174c6990",
      "supplier_name": "义乌市学煜饰品有限公司",
      "supplier_region": "CN"
    },
    {
      "platform_id": "1",
      "item_id": "954373378062",
      "title": "高品质现货当天发Labubu1.0拉布布一代搪胶挂件盲盒毛绒玩具",
      "image_url": "https://cbu01.alicdn.com/O1CN01jkjLwY1pEji5BW1ab_!!2220256125329-0-cib.jpg",
      "price_range": "18.00",
      "moq": 0,
      "supplier_id": "b2b-222025612532913f56",
      "supplier_name": "义乌市狄畅电子商务商行",
      "supplier_region": "CN"
    },
    {
      "platform_id": "1",
      "item_id": "936428871424",
      "title": "高质量泡玛拉拉特布布一代潮玩盲盒公仔搪胶心马卡国版",
      "image_url": "https://cbu01.alicdn.com/O1CN01xdCByK2AxiWk1Efe1_!!2219494688270-0-cib.jpg",
      "price_range": "199.0",
      "moq": 1,
      "supplier_id": "b2b-2219494688270189f3",
      "supplier_name": "东阳市乔白电子商务商行",
      "supplier_region": "CN"
    },
    {
      "platform_id": "1",
      "item_id": "947046238660",
      "title": "拉布布栗子可可一代祖国版马卡龙泡泡系列盲盒搪胶脸毛绒盲盒惊喜",
      "image_url": "https://cbu01.alicdn.com/O1CN01IqlZq71oqSi5Zrpzj_!!2220096815276-0-cib.jpg",
      "price_range": "19.00",
      "moq": 1,
      "supplier_id": "b2b-222009681527674dc6",
      "supplier_name": "合肥常满满电子商务有限公司",
      "supplier_region": "CN"
    },
    {
      "platform_id": "1",
      "item_id": "962060403269",
      "title": "现货泡泡玛特labubu拉布布搪胶脸摆件马卡龙一代毛绒玩具公仔手办",
      "image_url": "https://cbu01.alicdn.com/O1CN01bxJgYJ1QRgWE6y44p_!!2220417991973-0-cib.jpg",
      "price_range": "21.50",
      "moq": 0,
      "supplier_id": "b2b-222041799197352628",
      "supplier_name": "宿州周米米电子商务有限公司",
      "supplier_region": "CN"
    },
    {
      "platform_id": "1",
      "item_id": "957309161085",
      "title": "高品质现货labubu一代搪胶马卡龙盲盒可爱少女心毛绒玩具祖国版",
      "image_url": "https://cbu01.alicdn.com/O1CN01WrdiKs2IyeGxFjG8g_!!2219025819355-0-cib.jpg",
      "price_range": "28.00",
      "moq": 1,
      "supplier_id": "b2b-221902581935560bf4",
      "supplier_name": "义乌市顺版电子商务商行",
      "supplier_region": "CN"
    },
    {
      "platform_id": "1",
      "item_id": "963849308838",
      "title": "高质量现货泡泡玛特labubu拉布布搪胶脸一二三代毛绒玩具公仔挂件",
      "image_url": "https://cbu01.alicdn.com/O1CN01z7hfpl1tq4SbBXogj_!!2215959985952-0-cib.jpg",
      "price_range": "14.00",
      "moq": 1,
      "supplier_id": "b2b-2215959985952ee84e",
      "supplier_name": "东阳市渐浔商贸有限公司",
      "supplier_region": "CN"
    },
    {
      "platform_id": "1",
      "item_id": "959670200174",
      "title": "泡泡玛特labubu拉布布搪胶脸摆件马卡龙一代毛绒玩具公仔手办潮玩",
      "image_url": "https://cbu01.alicdn.com/O1CN01UsIP8a22xFCtD9Chc_!!2220354757186-0-cib.jpg",
      "price_range": "21.50",
      "moq": 1,
      "supplier_id": "b2b-22203547571863d530",
      "supplier_name": "淮北市杜集区海之宸科贸商行",
      "supplier_region": "CN"
    },
    {
      "platform_id": "1",
      "item_id": "953325853167",
      "title": "爆款labubu一代玩具现货毛绒玩偶公仔儿童礼物奇特盲盒高品质玩具",
      "image_url": "https://cbu01.alicdn.com/O1CN01pUfQZ52JDIwYfpX3J_!!2220273759387-0-cib.jpg",
      "price_range": "8.00",
      "moq": 0,
      "supplier_id": "b2b-222027375938797748",
      "supplier_name": "义乌市浔露电子商务商行",
      "supplier_region": "CN"
    },
    {
      "platform_id": "1",
      "item_id": "958821904804",
      "title": "源头厂家泡泡玛特THE MONSTERS前方高能系列搪胶毛绒挂件手办现货",
      "image_url": "https://cbu01.alicdn.com/O1CN01tqeLTC23YLI3p7IME_!!2220202407267-0-cib.jpg",
      "price_range": "12.99",
      "moq": 0,
      "supplier_id": "b2b-2220202407267f7841",
      "supplier_name": "义乌市狄秋电子商务商行",
      "supplier_region": "CN"
    },
    {
      "platform_id": "1",
      "item_id": "957528552041",
      "title": "高质量现货泡泡玛特labubu拉布布搪胶脸一二三代毛绒玩具公仔手办",
      "image_url": "https://cbu01.alicdn.com/O1CN01z7hfpl1tq4SbBXogj_!!2215959985952-0-cib.jpg",
      "price_range": "12.00",
      "moq": 0,
      "supplier_id": "b2b-2215959985952ee84e",
      "supplier_name": "东阳市渐浔商贸有限公司",
      "supplier_region": "CN"
    },
    {
      "platform_id": "1",
      "item_id": "915054798145",
      "title": "跨境可站立labubu17cm拉布布钥挂件娃娃换装鞋靴子配件批发",
      "image_url": "https://cbu01.alicdn.com/O1CN01OSevgL1Um4aBOhMJ1_!!2218615442559-0-cib.jpg",
      "price_range": "0.50",
      "moq": 2,
      "supplier_id": "b2b-221861544255964bdb",
      "supplier_name": "揭阳市榕城区睿诺百货商行",
      "supplier_region": "CN"
    },
    {
      "platform_id": "1",
      "item_id": "958180819976",
      "title": "泡泡玛特labubu拉布布搪胶脸摆件马卡龙一代毛绒玩具公仔手办萌",
      "image_url": "https://cbu01.alicdn.com/O1CN01eGUvq320Crs36PTnX_!!2220337216814-0-cib.jpg",
      "price_range": "19.00",
      "moq": 0,
      "supplier_id": "b2b-2220337216814cf393",
      "supplier_name": "淮北顺泓电子商务有限公司",
      "supplier_region": "CN"
    },
    {
      "platform_id": "1",
      "item_id": "943990022821",
      "title": "现货泡泡玛特labubu拉布布搪胶脸摆件马卡龙一代毛绒玩具公仔手办",
      "image_url": "https://cbu01.alicdn.com/O1CN01IqlZq71oqSi5Zrpzj_!!2220096815276-0-cib.jpg",
      "price_range": "19.00",
      "moq": 0,
      "supplier_id": "b2b-222009681527674dc6",
      "supplier_name": "合肥常满满电子商务有限公司",
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
    const [threshold, setThreshold] = useState(0.7);
    const [method, setMethod] = useState('mobilenet');
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
                    data: { urls, threshold, method }
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
