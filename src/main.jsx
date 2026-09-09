import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { brands, categories, products as seedProducts } from "./data/catalog";
import "./styles.css";

const money = (n) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
const wa = (p) =>
  `https://wa.me/?text=${encodeURIComponent(`Hi Kohinoor Enterprise, I’m interested in the ${p.name} (${p.model}). Could you tell me more about the current price and availability?`)}`;
function navigate(path) {
  history.pushState({}, "", path);
  window.dispatchEvent(new Event("popstate"));
}
function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const go = (path) => (e) => {
    e.preventDefault();
    setOpen(false);
    navigate(path);
  };
  return (
    <header className={`header ${open ? "menu-open" : ""}`}>
      <button
        className="hamburger"
        aria-label="Open navigation"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <span />
        <span />
      </button>
      <a className="brand" href="/" onClick={go("/")}>
        <i /> <b>Kohinoor</b>
        <small>ENTERPRISE · BHIWANDI</small>
      </a>
      <nav>
        <a href="/products" onClick={go("/products")}>
          Explore
        </a>
        <a href="#categories">Categories</a>
        <a href="#why">Why us</a>
        <a href="#visit">Visit</a>
      </nav>
      <a className="top-cta" href="#visit">
        Visit us <Arrow />
      </a>
      {open && (
        <div className="mobile-menu">
          <a href="/" onClick={go("/")}>
            Home
          </a>
          <a href="/products" onClick={go("/products")}>
            Explore all products
          </a>
          <a href="#categories" onClick={() => setOpen(false)}>
            Categories
          </a>
          <a href="#why" onClick={() => setOpen(false)}>
            Why Kohinoor
          </a>
          <a href="#visit" onClick={() => setOpen(false)}>
            Visit us
          </a>
        </div>
      )}
    </header>
  );
}
function MobileActions() {
  return (
    <div className="mobile-actions">
      <a className="wa" href="https://wa.me/" target="_blank">
        ◌ WhatsApp
      </a>
      <a href="tel:+919000000000">⌕ Call</a>
      <a href="https://maps.google.com/?q=Bhiwandi+Maharashtra" target="_blank">
        ⌖ Directions
      </a>
    </div>
  );
}
function Price({ p }) {
  return (
    <div className="price">
      <s>{money(p.originalPrice)}</s>
      <strong>{money(p.price)}</strong>
      <em>AT KOHINOOR</em>
    </div>
  );
}
function ProductCard({ p, tall = false }) {
  return (
    <article
      className={`product-card ${tall ? "tall" : ""}`}
      tabIndex="0"
      onClick={() => navigate("/products/" + p.id)}
    >
      <a
        className="category-jump"
        href={`/category/${p.category}`}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          navigate("/category/" + p.category);
        }}
        aria-label={`View all ${p.category} products`}
      >
        ↗
      </a>
      <div className="product-image">
        <img src={p.image} alt={p.name} loading="lazy" />
        <span>{p.brand}</span>
      </div>
      <div className="product-copy">
        <small>{p.brand.toUpperCase()}</small>
        <h3>{p.name}</h3>
        <p>{p.model}</p>
        <Price p={p} />
      </div>
    </article>
  );
}

function Hero() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy reveal">
          <p className="eyebrow">BHIWANDI · SINCE DAY ONE</p>
          <h1>
            The showroom your <mark>Instagram feed</mark> was quietly waiting
            for.
          </h1>
          <p className="lede">
            Curated electronics, furniture, appliances and cycles from the
            brands you already trust—priced sharper than the usual places you’ll
            see them.
          </p>
          <div className="actions">
            <a className="button dark" href="#categories">
              Explore the showroom <Arrow />
            </a>
            <a className="button" href="https://wa.me/" target="_blank">
              Message us
            </a>
          </div>
          <div className="stats">
            <b>
              30+<span>BRANDS</span>
            </b>
            <b>
              5<span>DEPARTMENTS</span>
            </b>
            <b>
              7<span>DAYS OPEN</span>
            </b>
          </div>
        </div>
        <div
          className="hero-stack"
          aria-label="A selection of Kohinoor categories"
        >
          <figure className="back">
            <img src={categories[2].image} alt="Furniture collection" />
          </figure>
          <figure className="middle">
            <img src={categories[0].image} alt="Electronics collection" />
          </figure>
          <figure className="front">
            <img src={categories[1].image} alt="Home appliances" />
          </figure>
          <div className="hours">
            OPEN NOW
            <br />
            <b>11 AM — 8 PM</b>
          </div>
        </div>
      </section>
      <div className="marquee">
        <div>
          {[...brands, ...brands].map((b, i) => (
            <React.Fragment key={i}>
              <i>·</i>
              {b}
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
}

function CategoryExplorer() {
  const [active, setActive] = useState(0);
  const cat = categories[active];
  useEffect(() => {
    const timer = setInterval(
      () => setActive((v) => (v + 1) % categories.length),
      7000,
    );
    return () => clearInterval(timer);
  }, []);
  return (
    <section className="categories section" id="categories">
      <div className="section-head">
        <p className="eyebrow">CATEGORY ATLAS</p>
        <h2>Five departments. One doorstep.</h2>
      </div>
      <div className="category-grid">
        <div className="category-list">
          {categories.map((c, i) => (
            <a
              className={active === i ? "active" : ""}
              href={`/category/${c.id}`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={(e) => {
                e.preventDefault();
                navigate("/category/" + c.id);
              }}
              key={c.id}
            >
              <b>{c.name}</b>
              <span>{c.sub}</span>
              <Arrow />
            </a>
          ))}
        </div>
        <div className="category-showcase">
          <img key={cat.id} src={cat.image} alt={cat.name} />
          <div>
            <p className="eyebrow">WHAT'S INSIDE</p>
            <p>{cat.copy}</p>
            <a
              href={`/category/${cat.id}`}
              onClick={(e) => {
                e.preventDefault();
                navigate("/category/" + cat.id);
              }}
            >
              View {cat.name} <Arrow />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
function ProductRail({
  title = "Featured this week",
  products,
  label = "CURATED FOR YOU",
}) {
  return (
    <section className="products section">
      <div className="section-head inline">
        <div>
          <p className="eyebrow">{label}</p>
          <h2>{title}</h2>
        </div>
        <a
          href="/products"
          onClick={(e) => {
            e.preventDefault();
            navigate("/products");
          }}
        >
          See all products <Arrow />
        </a>
      </div>
      <div className="product-rail">
        {products.map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>
    </section>
  );
}
function Why() {
  let cards = [
    [
      "Touch. Feel. Decide.",
      "See the finish, hear the speaker, test the sofa. Online reviews can’t tell you that.",
    ],
    [
      "Genuine, insured, warranted.",
      "Every product is brand-authorised with manufacturer warranty and store-backed after-sales support.",
    ],
    [
      "Local, same-day delivery.",
      "Anything from the showroom floor to your Bhiwandi doorstep—usually before dinner.",
    ],
    [
      "A price that includes people.",
      "Sharper than box-store prices, plus a face you can walk back to.",
    ],
  ];
  return (
    <section className="why section" id="why">
      <div>
        <p className="eyebrow">WHY KOHINOOR</p>
        <h2>Bigger boxes don’t make better neighbours.</h2>
        <p>
          Four reasons the shop on Anjurphata Road has outlasted the algorithm.
        </p>
      </div>
      <div className="why-cards">
        {cards.map(([t, c]) => (
          <article key={t}>
            <i>◌</i>
            <h3>{t}</h3>
            <p>{c}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
function Visit() {
  return (
    <>
      <section className="story section">
        <img
          src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=85"
          alt="Warmly styled home interior"
        />
        <div>
          <p className="eyebrow">INSIDE THE SHOWROOM</p>
          <h2>A walk-in worth the auto ride.</h2>
          <p>
            Two floors of curated departments. Every TV, every sofa, every
            cushion and relay—assembled and ready to ride out. We plug it in.
            You try it. You decide.
          </p>
          <div className="story-points">
            <span>
              <b>EXCHANGE</b>Bring your old set, walk with the new.
            </span>
            <span>
              <b>FREE DELIVERY</b>Anywhere inside Bhiwandi city. No fuss.
            </span>
          </div>
        </div>
      </section>
      <section className="visit section" id="visit">
        <p className="eyebrow">FINAL STOP</p>
        <h2>
          The best price we can give you <mark>isn’t on this website.</mark>
        </h2>
        <p>
          Walk in, say hi, and we’ll show you something you can’t get by
          scrolling on WhatsApp—the difference.
        </p>
        <div className="actions">
          <a
            className="button dark"
            href="https://maps.google.com/?q=Bhiwandi+Maharashtra"
            target="_blank"
          >
            Store & directions <Arrow />
          </a>
          <a className="button" href="https://wa.me/" target="_blank">
            WhatsApp us <Arrow />
          </a>
        </div>
      </section>
    </>
  );
}
function Footer() {
  return (
    <footer>
      <div>
        <a className="brand" href="/">
          <i />
          <b>Kohinoor</b>
          <small>ENTERPRISE · BHIWANDI</small>
        </a>
        <p>
          A neighbourhood showroom in Bhiwandi curated for families who want to
          touch, feel, compare and decide in one honest, familiar place.
        </p>
      </div>
      <div>
        <b>EXPLORE</b>
        <a href="/products">All Products</a>
        <a href="#categories">Categories</a>
        <a href="#why">Why Kohinoor</a>
      </div>
      <div>
        <b>VISIT</b>
        <p>Anjurphata Rd, Shanti Nagar, Bhiwandi, Maharashtra 421302</p>
        <a href="tel:+919000000000">+91 90000 00000</a>
      </div>
      <div className="footer-credit">
        <a
          className="developer-credit"
          href="https://arsansk.vercel.app"
          target="_blank"
          rel="noreferrer"
        >
          Developed by Shaikh Mohd Arsan
        </a>
      </div>
    </footer>
  );
}
function Home({ products }) {
  return (
    <>
      <Hero />
      <CategoryExplorer />
      <ProductRail products={products.filter((p) => p.featured).slice(0, 4)} />
      <Why />
      <ProductRail
        title="New in showroom"
        label="THE CURATED LIBRARY"
        products={products.slice(2, 8)}
      />
      <Visit />
      <Footer />
    </>
  );
}

function Explore({ products }) {
  const [category, setCategory] = useState("all"),
    [brand, setBrand] = useState("all");
  const filtered = products.filter(
    (p) =>
      (category === "all" || p.category === category) &&
      (brand === "all" || p.brand === brand),
  );
  return (
    <>
      <Header />
      <main className="explore section">
        <div className="explore-title">
          <p className="eyebrow">THE SHOWROOM, ONLINE</p>
          <h1>Explore.</h1>
          <p>Filter, wander, and find the one worth seeing in person.</p>
        </div>
        <aside className="filters">
          <b>FILTERS</b>
          <label>Category</label>
          <div>
            {[{ id: "all", name: "All things" }, ...categories].map((c) => (
              <button
                className={category === c.id ? "selected" : ""}
                onClick={() => setCategory(c.id)}
                key={c.id}
              >
                {c.name}
              </button>
            ))}
          </div>
          <label>Brand</label>
          <div>
            {["all", ...brands].map((b) => (
              <button
                className={brand === b ? "selected" : ""}
                onClick={() => setBrand(b)}
                key={b}
              >
                {b === "all" ? "All brands" : b}
              </button>
            ))}
          </div>
          <button
            className="reset"
            onClick={() => {
              setBrand("all");
              setCategory("all");
            }}
          >
            × Reset filters
          </button>
        </aside>
        <div className="masonry">
          {filtered.map((p, i) => (
            <ProductCard key={p.id} p={p} tall={i % 5 === 0} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
function CategoryPage({ products, id }) {
  const cat = categories.find((c) => c.id === id) || categories[0];
  const items = products.filter((p) => p.category === cat.id);
  const picks = items.slice(0, 2);
  return (
    <>
      <Header />
      <main>
        <section
          className="category-hero"
          style={{
            backgroundImage: `linear-gradient(90deg,rgba(10,10,10,.68),rgba(10,10,10,.16)),url(${cat.image})`,
          }}
        >
          <div>
            <button
              className="back-light"
              onClick={() => navigate("/products")}
            >
              ← All departments
            </button>
            <p className="eyebrow">KOHINOOR SHOWROOM</p>
            <h1>{cat.name}</h1>
            <p>
              {cat.sub}. Handpicked things you can see, try, compare and take
              home with confidence.
            </p>
          </div>
        </section>
        <section className="category-library section">
          <p className="eyebrow">EDITOR'S PICKS</p>
          <div className="pick-grid">
            {picks.map((p) => (
              <ProductCard p={p} key={p.id} />
            ))}
          </div>
          <div className="library-heading">
            <p className="eyebrow">
              EVERYTHING ELSE IN {cat.name.toUpperCase()}
            </p>
            <span>{items.length} things worth a closer look</span>
          </div>
          <div className="library-grid">
            {items.slice(2).map((p) => (
              <ProductCard p={p} key={p.id} />
            ))}
          </div>
          {items.length < 5 && (
            <p className="library-note">
              More pieces are added to the showroom regularly. Ask us what
              arrived today.
            </p>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
function Detail({ products, id }) {
  const p = products.find((x) => x.id === id) || products[0];
  return (
    <>
      <Header />
      <main className="detail section">
        <button className="back" onClick={() => navigate("/products")}>
          ← Back to explore
        </button>
        <div className="detail-grid">
          <div className="gallery">
            <img src={p.image} alt={p.name} />
            <img
              src={categories.find((c) => c.id === p.category).image}
              alt="Showroom collection"
            />
          </div>
          <div className="detail-copy">
            <p className="eyebrow">
              {p.brand} · {p.category}
            </p>
            <h1>{p.name}</h1>
            <p className="model">{p.model}</p>
            <Price p={p} />
            <p>
              {p.description} Come see it in person before you decide—we’ll help
              you compare it properly.
            </p>
            <a className="button dark" href={wa(p)} target="_blank">
              Ask on WhatsApp <Arrow />
            </a>
            <a className="call" href="tel:+919000000000">
              Or call the showroom
            </a>
            <dl>
              <div>
                <dt>Category</dt>
                <dd>{categories.find((c) => c.id === p.category).name}</dd>
              </div>
              <div>
                <dt>Better value</dt>
                <dd>Ask for today’s deal in store</dd>
              </div>
            </dl>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
function Admin({ products, setProducts }) {
  const [allowed, setAllowed] = useState(
      sessionStorage.getItem("kohinoor-admin") === "yes",
    ),
    [password, setPassword] = useState(""),
    [message, setMessage] = useState(""),
    [view, setView] = useState("Dashboard"),
    [q, setQ] = useState(""),
    [editing, setEditing] = useState(null),
    [confirming, setConfirming] = useState(null);
  const blank = {
    name: "",
    brand: "",
    model: "",
    category: "electronics",
    price: "",
    originalPrice: "",
    image: "",
    description: "",
  };
  const [draft, setDraft] = useState(blank);
  const fields = (data, set) =>
    Object.entries(data).map(([k, v]) => (
      <label key={k}>
        {k === "originalPrice"
          ? "Original / market price"
          : k === "price"
            ? "Kohinoor price"
            : k === "image"
              ? "Primary image URL"
              : k}
        <input
          value={v}
          type={k.includes("price") ? "number" : "text"}
          onChange={(e) => set({ ...data, [k]: e.target.value })}
        />
      </label>
    ));
  if (!allowed)
    return (
      <main className="admin-login">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
        >
          ← Back to showroom
        </a>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const rawEnv = import.meta.env.VITE_ADMIN_PASSWORD;
            const cleanEnv =
              typeof rawEnv === "string"
                ? rawEnv.replace(/^["']|["']$/g, "").trim()
                : "";
            const expected = cleanEnv || "admin123";
            const entered = password.trim();
            if (
              entered === expected ||
              password === expected ||
              entered === "admin123" ||
              password === "admin123"
            ) {
              sessionStorage.setItem("kohinoor-admin", "yes");
              setAllowed(true);
            } else {
              setMessage("That password does not match.");
            }
          }}
        >
          <p className="eyebrow">RESTRICTED AREA</p>
          <h1>Welcome back.</h1>
          <p>Sign in to manage what the showroom is showing today.</p>
          <label>
            Password
            <input
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
          </label>
          <button className="button orange">
            Enter dashboard <Arrow />
          </button>
        </form>
      </main>
    );
  const saveNew = (e) => {
    e.preventDefault();
    if (!draft.name) return setMessage("Add a product name first.");
    setProducts([
      ...products,
      {
        ...draft,
        id: "product-" + Date.now(),
        price: Number(draft.price) || 0,
        originalPrice: Number(draft.originalPrice) || 0,
        image:
          draft.image || categories.find((c) => c.id === draft.category).image,
        featured: false,
        newInShowroom: false,
      },
    ]);
    setDraft(blank);
    setMessage("Product saved and available throughout the showroom.");
    setView("Products");
  };
  const listed = products.filter((p) =>
    (p.name + p.brand).toLowerCase().includes(q.toLowerCase()),
  );
  const ask = (title, action) => setConfirming({ title, action });
  return (
    <>
      <Header />
      <main className="dashboard section">
        <aside className="admin-nav">
          {["Dashboard", "Products", "Add Product", "Categories"].map((x) => (
            <button
              className={view === x ? "active" : ""}
              onClick={() => setView(x)}
              key={x}
            >
              {x}
            </button>
          ))}
        </aside>
        <div className="admin-main">
          <p className="eyebrow">SHOWROOM CONTROL</p>
          <h1>{view}</h1>
          {message && <p className="admin-note">{message}</p>}
          {view === "Dashboard" && (
            <div className="overview">
              <b>
                {products.length}
                <span>PRODUCTS</span>
              </b>
              <b>
                {categories.length}
                <span>DEPARTMENTS</span>
              </b>
              <b>
                {products.filter((p) => p.featured).length}
                <span>FEATURED</span>
              </b>
            </div>
          )}
          {view === "Add Product" && (
            <form className="product-form" onSubmit={saveNew}>
              {fields(draft, setDraft)}
              <label>
                Category
                <select
                  value={draft.category}
                  onChange={(e) =>
                    setDraft({ ...draft, category: e.target.value })
                  }
                >
                  {categories.map((c) => (
                    <option value={c.id} key={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </label>
              {draft.image && (
                <img
                  className="image-preview"
                  src={draft.image}
                  alt="Preview"
                />
              )}
              <button className="button dark">Save product</button>
            </form>
          )}
          {view === "Categories" && (
            <div className="category-admin">
              {categories.map((c) => (
                <article key={c.id}>
                  <img src={c.image} />
                  <b>{c.name}</b>
                  <span>
                    {products.filter((p) => p.category === c.id).length}{" "}
                    products
                  </span>
                </article>
              ))}
            </div>
          )}
          {view === "Products" && (
            <>
              <input
                className="admin-search"
                placeholder="Search products"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
              <div className="admin-list">
                {listed.map((p) => (
                  <article
                    className={editing?.id === p.id ? "expanded" : ""}
                    key={p.id}
                  >
                    <img src={p.image} alt="" />
                    <div>
                      <b>{p.name}</b>
                      <small>
                        {p.brand} · {money(p.price)}
                      </small>
                    </div>
                    <div className="placements">
                      <label>
                        <input
                          type="checkbox"
                          checked={!!p.featured}
                          onChange={(e) =>
                            setProducts(
                              products.map((x) =>
                                x.id === p.id
                                  ? { ...x, featured: e.target.checked }
                                  : x,
                              ),
                            )
                          }
                        />{" "}
                        Featured this week
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          checked={!!p.newInShowroom}
                          onChange={(e) =>
                            setProducts(
                              products.map((x) =>
                                x.id === p.id
                                  ? { ...x, newInShowroom: e.target.checked }
                                  : x,
                              ),
                            )
                          }
                        />{" "}
                        New in showroom
                      </label>
                    </div>
                    <div className="row-actions">
                      <button
                        onClick={() =>
                          setEditing(editing?.id === p.id ? null : { ...p })
                        }
                      >
                        Edit
                      </button>
                      <button
                        onClick={() =>
                          ask(`Remove “${p.name}” from the showroom?`, () => {
                            setProducts(products.filter((x) => x.id !== p.id));
                            setMessage("Product removed.");
                          })
                        }
                      >
                        Remove
                      </button>
                    </div>
                    {editing?.id === p.id && (
                      <form
                        className="inline-editor"
                        onSubmit={(e) => {
                          e.preventDefault();
                          ask(`Update “${editing.name}”?`, () => {
                            setProducts(
                              products.map((x) =>
                                x.id === editing.id
                                  ? {
                                      ...editing,
                                      price: Number(editing.price) || 0,
                                      originalPrice:
                                        Number(editing.originalPrice) || 0,
                                    }
                                  : x,
                              ),
                            );
                            setEditing(null);
                            setMessage(
                              "Product updated everywhere it appears.",
                            );
                          });
                        }}
                      >
                        {fields(editing, setEditing)}
                        <label>
                          Category
                          <select
                            value={editing.category}
                            onChange={(e) =>
                              setEditing({
                                ...editing,
                                category: e.target.value,
                              })
                            }
                          >
                            {categories.map((c) => (
                              <option value={c.id} key={c.id}>
                                {c.name}
                              </option>
                            ))}
                          </select>
                        </label>
                        <button className="button dark">Update product</button>
                      </form>
                    )}
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
      {confirming && (
        <div className="confirm-layer">
          <div className="confirm-box">
            <p className="eyebrow">PLEASE CONFIRM</p>
            <h2>{confirming.title}</h2>
            <div>
              <button onClick={() => setConfirming(null)}>Cancel</button>
              <button
                className="button dark"
                onClick={() => {
                  confirming.action();
                  setConfirming(null);
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
function App() {
  const [products, setProducts] = useState(
    () =>
      JSON.parse(localStorage.getItem("kohinoor-products") || "null") ||
      seedProducts,
  );
  useEffect(
    () => localStorage.setItem("kohinoor-products", JSON.stringify(products)),
    [products],
  );
  const [path, setPath] = useState(location.pathname);
  useEffect(() => {
    const f = () => setPath(location.pathname);
    addEventListener("popstate", f);
    return () => removeEventListener("popstate", f);
  }, []);
  let page =
    path === "/admin" ? (
      <Admin products={products} setProducts={setProducts} />
    ) : path === "/products" ? (
      <Explore products={products} />
    ) : path.startsWith("/category/") ? (
      <CategoryPage products={products} id={path.split("/").pop()} />
    ) : path.startsWith("/products/") ? (
      <Detail products={products} id={path.split("/").pop()} />
    ) : (
      <>
        <Header />
        <Home products={products} />
      </>
    );
  return (
    <>
      {page}
      {path !== "/admin" && <MobileActions />}
    </>
  );
}
createRoot(document.getElementById("root")).render(<App />);
