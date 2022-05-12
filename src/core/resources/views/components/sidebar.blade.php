<div class="shadow-sm sidebar">
    <div class="sidebar__logo">
        <div class="logo-name">HuyNT</div>
        <button class="btn sidebar__toggle">
            <svg class="bi toggle-arrow" width="18" height="18" fill="currentColor">
                <use xlink:href="/images/bootstrap-icons.svg#arrow-left"/>
            </svg>
        </button>
    </div>
    <ul class="sidebar__nav">
        <li class="nav-item {{ Route::currentRouteName() == 'admin.index' ? 'nav-item--active' : '' }}">
            <a href="/admin" class="nav-item__link">
                <svg class="bi link-icon" fill="currentColor">
                    <use xlink:href="/images/bootstrap-icons.svg#house"/>
                </svg>
                <span class="nav-item__label">Home</span>
                <span class="nav-item__tooltip">Home</span>
            </a>
        </li>
        <li class="nav-item {{ Route::currentRouteName() == 'admin.blogs' ? 'nav-item--active' : '' }}">
            <a href="/admin/blogs" class="nav-item__link">
                <svg class="bi link-icon" fill="currentColor">
                    <use xlink:href="/images/bootstrap-icons.svg#journals"/>
                </svg>
                <span class="nav-item__label">Blog</span>
                <span class="nav-item__tooltip">Blog</span>
            </a>
        </li>
        
        {{-- <li class="nav-item {{ Route::currentRouteName() == 'admin.orders' ? 'nav-item--active' : '' }}">
            <a href="/admin/orders" class="nav-item__link">
                <svg class="bi link-icon" fill="currentColor">
                    <use xlink:href="/images/bootstrap-icons.svg#cart"/>
                </svg>
                <span class="nav-item__label">Order</span>
                <span class="nav-item__tooltip">Order</span>
            </a>
        </li>
        <li class="nav-item {{ Route::currentRouteName() == 'admin.products' ? 'nav-item--active' : '' }}">
            <a href="/admin/products" class="nav-item__link">
                <svg class="bi link-icon" fill="currentColor">
                    <use xlink:href="/images/bootstrap-icons.svg#box-seam"/>
                </svg>
                <span class="nav-item__label">Product</span>
                <span class="nav-item__tooltip">Product</span>
            </a>
        </li>
        <li class="nav-item {{ Route::currentRouteName() == 'admin.seo' ? 'nav-item--active' : '' }}">
            <a href="/admin/seo" class="nav-item__link">
                <svg class="bi link-icon" fill="currentColor">
                    <use xlink:href="/images/bootstrap-icons.svg#speedometer2"/>
                </svg>
                <span class="nav-item__label">SEO</span>
                <span class="nav-item__tooltip">SEO</span>
            </a>
        </li> --}}
        <li class="nav-item {{ Route::currentRouteName() == 'admin.setting' ? 'nav-item--active' : '' }} mt-auto">
            <a href="#" class="nav-item__link">
                <svg class="bi link-icon" fill="currentColor">
                    <use xlink:href="/images/bootstrap-icons.svg#gear"/>
                </svg>
                <span class="nav-item__label">Setting</span>
                <span class="nav-item__tooltip">Setting</span>
            </a>
        </li> 
    </ul>
</div>