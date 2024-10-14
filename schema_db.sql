-- Supabase AI is experimental and may produce incorrect answers
-- Always verify the output before executing

CREATE TABLE public.bank_details (
    id bigint primary key generated always as identity,
    iban text NOT NULL,
    bank text NOT NULL,
    bic text NOT NULL,
    seller_id integer NULL,
    user_id uuid NULL,
    accountname text NULL,
    CONSTRAINT bank_details_seller_id_fkey FOREIGN KEY (seller_id) REFERENCES sellers(id),
    CONSTRAINT bank_details_user_id_fkey FOREIGN KEY (user_id) REFERENCES "user"(id) ON UPDATE CASCADE
) TABLESPACE pg_default;

CREATE TABLE public.buyers (
    id bigint primary key generated always as identity,
    name text NOT NULL,
    address text NOT NULL,
    country text NOT NULL,
    vatnumber text NULL,
    contractnumber text NULL,
    contactperson text NULL,
    paymentterm text NULL,
    deliveryterm text NULL,
    registrationnumber text NULL,
    currency_id integer NULL,
    contactpersonrole text NULL DEFAULT ''::text,
    user_id uuid NULL,
    time_stamp timestamp with time zone NULL DEFAULT (now() AT TIME ZONE 'utc'::text),
    CONSTRAINT buyers_currency_id_fkey FOREIGN KEY (currency_id) REFERENCES currencies(id) ON UPDATE CASCADE,
    CONSTRAINT buyers_user_id_fkey FOREIGN KEY (user_id) REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE CASCADE
) TABLESPACE pg_default;

CREATE TABLE public.countries (
    url text NULL,
    alpha3 text NOT NULL,
    name text NULL,
    file_url text NULL,
    CONSTRAINT countries_pkey PRIMARY KEY (alpha3)
) TABLESPACE pg_default;

CREATE TABLE public.currencies (
    id bigint primary key generated always as identity,
    name text NOT NULL,
    symbol text NOT NULL
) TABLESPACE pg_default;

CREATE TABLE public.currency_rates (
    currency_id bigint NOT NULL,
    rate_to_base numeric NOT NULL,
    effective_date timestamp with time zone NOT NULL,
    CONSTRAINT currency_rates_pkey PRIMARY KEY (currency_id, effective_date),
    CONSTRAINT fk_currency FOREIGN KEY (currency_id) REFERENCES currencies(id)
) TABLESPACE pg_default;

CREATE TABLE public.invoice_design (
    id bigint primary key generated always as identity,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    logo text NULL,
    slogan text NULL DEFAULT ''::text,
    footer text NULL DEFAULT ''::text,
    color text NULL,
    user_id uuid NULL,
    CONSTRAINT invoice_design_user_id_fkey FOREIGN KEY (user_id) REFERENCES "user"(id) ON UPDATE CASCADE
) TABLESPACE pg_default;

CREATE TABLE public.invoices (
    invoicenumber text NOT NULL,
    vattype text NULL,
    date timestamp with time zone NOT NULL,
    deliveryterm text NULL,
    deliverydate timestamp with time zone NULL,
    paymentsplit text NULL,
    subtotal numeric(10,2) NULL,
    total numeric(10,2) NULL,
    taxrate numeric(5,2) NULL,
    totaltax numeric(10,2) NULL,
    totaldiscount numeric(10,2) NULL,
    discountrate numeric(5,2) NULL,
    numberinwords text NULL,
    comments text NULL,
    paymentstatus text NULL,
    buyer_id integer NULL,
    seller_id integer NULL,
    currency_id integer NULL DEFAULT 1,
    time_stamp timestamp with time zone NULL DEFAULT (now() AT TIME ZONE 'utc'::text),
    user_id uuid NULL,
    bank_details_id integer NULL,
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    address_id bigint NULL,
    invoice_id uuid NOT NULL DEFAULT gen_random_uuid(),
    CONSTRAINT invoice_pkey PRIMARY KEY (invoicenumber),
    CONSTRAINT invoices_invoice_id_key UNIQUE (invoice_id),
    CONSTRAINT invoices_id_key UNIQUE (id),
    CONSTRAINT invoices_buyer_id_fkey FOREIGN KEY (buyer_id) REFERENCES buyers(id),
    CONSTRAINT invoices_currency_id_fkey FOREIGN KEY (currency_id) REFERENCES currencies(id),
    CONSTRAINT invoices_seller_id_fkey FOREIGN KEY (seller_id) REFERENCES sellers(id),
    CONSTRAINT invoices_user_id_fkey FOREIGN KEY (user_id) REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT invoices_address_id_fkey FOREIGN KEY (address_id) REFERENCES seller_addresses(id),
    CONSTRAINT invoices_bank_details_id_fkey FOREIGN KEY (bank_details_id) REFERENCES bank_details(id)
) TABLESPACE pg_default;

CREATE TABLE public.invoices_products (
    id bigint primary key generated always as identity,
    invoicenumber text NULL,
    product_id integer NULL,
    units integer NOT NULL,
    unitprice numeric(10,2) NOT NULL,
    unitvat numeric(5,2) NOT NULL,
    unittotal numeric(10,2) NOT NULL,
    productlot text NULL DEFAULT ''::text,
    languageversion text NULL DEFAULT ''::text,
    user_id uuid NULL,
    invoice_id uuid NULL,
    CONSTRAINT invoice_product_pkey PRIMARY KEY (id),
    CONSTRAINT invoices_products_invoice_id_fkey FOREIGN KEY (invoice_id) REFERENCES invoices(invoice_id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT invoices_products_invoicenumber_fkey FOREIGN KEY (invoicenumber) REFERENCES invoices(invoicenumber),
    CONSTRAINT invoices_products_product_id_fkey FOREIGN KEY (product_id) REFERENCES products(id),
    CONSTRAINT invoices_products_user_id_fkey FOREIGN KEY (user_id) REFERENCES "user"(id) ON UPDATE CASCADE
) TABLESPACE pg_default;

CREATE TABLE public.order_confirmation (
    invoicenumber text NOT NULL,
    vattype text NULL,
    date timestamp with time zone NOT NULL,
    deliveryterm text NULL,
    deliverydate timestamp with time zone NULL,
    paymentsplit text NULL,
    subtotal numeric(10,2) NULL,
    total numeric(10,2) NULL,
    taxrate numeric(5,2) NULL,
    totaltax numeric(10,2) NULL,
    totaldiscount numeric(10,2) NULL,
    discountrate numeric(5,2) NULL,
    numberinwords text NULL,
    comments text NULL,
    paymentstatus text NULL,
    buyer_id integer NULL,
    seller_id integer NULL,
    currency_id integer NULL DEFAULT 1,
    time_stamp timestamp with time zone NULL DEFAULT (now() AT TIME ZONE 'utc'::text),
    user_id uuid NULL,
    address_id bigint NULL,
    order_confirmation_id uuid NOT NULL DEFAULT gen_random_uuid(),
    CONSTRAINT order_confirmation_pkey PRIMARY KEY (invoicenumber),
    CONSTRAINT order_confirmation_id_key UNIQUE (order_confirmation_id),
    CONSTRAINT order_confirmation_buyer_id_fkey FOREIGN KEY (buyer_id) REFERENCES buyers(id),
    CONSTRAINT order_confirmation_seller_id_fkey FOREIGN KEY (seller_id) REFERENCES sellers(id),
    CONSTRAINT order_confirmation_user_id_fkey FOREIGN KEY (user_id) REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT order_confirmation_currency_id_fkey FOREIGN KEY (currency_id) REFERENCES currencies(id),
    CONSTRAINT order_confirmation_address_id_fkey FOREIGN KEY (address_id) REFERENCES seller_addresses(id)
) TABLESPACE pg_default;

CREATE TABLE public.order_confirmation_products (
    id bigint primary key generated always as identity,
    invoicenumber text NULL,
    product_id integer NULL,
    units integer NOT NULL,
    unitprice numeric(10,2) NOT NULL,
    unitvat numeric(5,2) NOT NULL,
    unittotal numeric(10,2) NOT NULL,
    productlot text NULL DEFAULT ''::text,
    languageversion text NULL DEFAULT ''::text,
    user_id uuid NULL,
    order_confirmation_id uuid NULL,
    CONSTRAINT order_confirmation_products_pkey PRIMARY KEY (id),
    CONSTRAINT order_confirmation_products_invoicenumber_fkey FOREIGN KEY (invoicenumber) REFERENCES order_confirmation(invoicenumber),
    CONSTRAINT order_confirmation_products_order_confirmation_id_fkey FOREIGN KEY (order_confirmation_id) REFERENCES order_confirmation(order_confirmation_id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT order_confirmation_products_product_id_fkey FOREIGN KEY (product_id) REFERENCES products(id),
    CONSTRAINT order_confirmation_products_user_id_fkey FOREIGN KEY (user_id) REFERENCES "user"(id) ON UPDATE CASCADE
) TABLESPACE pg_default;

CREATE TABLE public.products (
    id bigint primary key generated always as identity,
    name text NOT NULL,
    description text NULL,
    category text NULL,
    price numeric(10,2) NOT NULL,
    time_stamp timestamp with time zone NULL DEFAULT (now() AT TIME ZONE 'utc'::text),
    defaultquantity numeric NULL DEFAULT '0'::numeric,
    maxquantity numeric NULL DEFAULT '0'::numeric,
    imageurl text NULL,
    status text NULL DEFAULT 'active'::text,
    user_id uuid NULL,
    color text NULL DEFAULT '#000000'::text,
    CONSTRAINT products_user_id_fkey FOREIGN KEY (user_id) REFERENCES "user"(id) ON UPDATE CASCADE,
    CONSTRAINT products_status_check CHECK (((status = 'active'::text) OR (status = 'archived'::text) OR (status = 'deleted'::text)))
) TABLESPACE pg_default;

CREATE TABLE public.proforma (
    invoicenumber text NOT NULL,
    vattype text NULL,
    date timestamp with time zone NOT NULL,
    deliveryterm text NULL,
    deliverydate timestamp with time zone NULL,
    paymentsplit text NULL,
    subtotal numeric(10,2) NULL,
    total numeric(10,2) NULL,
    taxrate numeric(5,2) NULL,
    totaltax numeric(10,2) NULL,
    totaldiscount numeric(10,2) NULL,
    discountrate numeric(5,2) NULL,
    invoice_id uuid NULL,
    CONSTRAINT invoice_product_pkey PRIMARY KEY (id),
    CONSTRAINT invoices_products_invoice_id_fkey FOREIGN KEY (invoice_id) REFERENCES invoices(invoice_id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT invoices_products_invoicenumber_fkey FOREIGN KEY (invoicenumber) REFERENCES invoices(invoicenumber),
    CONSTRAINT invoices_products_product_id_fkey FOREIGN KEY (product_id) REFERENCES products(id),
    CONSTRAINT invoices_products_user_id_fkey FOREIGN KEY (user_id) REFERENCES "user"(id) ON UPDATE CASCADE
) TABLESPACE pg_default;

CREATE TABLE public.order_confirmation (
    invoicenumber text NOT NULL,
    vattype text NULL,
    date timestamp with time zone NOT NULL,
    deliveryterm text NULL,
    deliverydate timestamp with time zone NULL,
    paymentsplit text NULL,
    subtotal numeric(10,2) NULL,
    total numeric(10,2) NULL,
    taxrate numeric(5,2) NULL,
    totaltax numeric(10,2) NULL,
    totaldiscount numeric(10,2) NULL,
    discountrate numeric(5,2) NULL,
    numberinwords text NULL,
    comments text NULL,
    paymentstatus text NULL,
    buyer_id integer NULL,
    seller_id integer NULL,
    currency_id integer NULL DEFAULT 1,
    time_stamp timestamp with time zone NULL DEFAULT (now() AT TIME ZONE 'utc'::text),
    user_id uuid NULL,
    address_id bigint NULL,
    order_confirmation_id uuid NOT NULL DEFAULT gen_random_uuid(),
    CONSTRAINT order_confirmation_pkey PRIMARY KEY (invoicenumber),
    CONSTRAINT order_confirmation_id_key UNIQUE (order_confirmation_id),
    CONSTRAINT order_confirmation_buyer_id_fkey FOREIGN KEY (buyer_id) REFERENCES buyers(id),
    CONSTRAINT order_confirmation_seller_id_fkey FOREIGN KEY (seller_id) REFERENCES sellers(id),
    CONSTRAINT order_confirmation_user_id_fkey FOREIGN KEY (user_id) REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT order_confirmation_currency_id_fkey FOREIGN KEY (currency_id) REFERENCES currencies(id),
    CONSTRAINT order_confirmation_address_id_fkey FOREIGN KEY (address_id) REFERENCES seller_addresses(id)
) TABLESPACE pg_default;

CREATE TABLE public.order_confirmation_products (
    id bigint primary key generated always as identity,
    invoicenumber text NULL,
    product_id integer NULL,
    units integer NOT NULL,
    unitprice numeric(10,2) NOT NULL,
    unitvat numeric(5,2) NOT NULL,
    unittotal numeric(10,2) NOT NULL,
    productlot text NULL DEFAULT ''::text,
    languageversion text NULL DEFAULT ''::text,
    user_id uuid NULL,
    order_confirmation_id uuid NULL,
    CONSTRAINT order_confirmation_products_pkey PRIMARY KEY (id),
    CONSTRAINT order_confirmation_products_invoicenumber_fkey FOREIGN KEY (invoicenumber) REFERENCES order_confirmation(invoicenumber),
    CONSTRAINT order_confirmation_products_order_confirmation_id_fkey FOREIGN KEY (order_confirmation_id) REFERENCES order_confirmation(order_confirmation_id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT order_confirmation_products_product_id_fkey FOREIGN KEY (product_id) REFERENCES products(id),
    CONSTRAINT order_confirmation_products_user_id_fkey FOREIGN KEY (user_id) REFERENCES "user"(id) ON UPDATE CASCADE
) TABLESPACE pg_default;

CREATE TABLE public.products (
    id bigint primary key generated always as identity,
    name text NOT NULL,
    description text NULL,
    category text NULL,
    price numeric(10,2) NOT NULL,
    time_stamp timestamp with time zone NULL DEFAULT (now() AT TIME ZONE 'utc'::text),
    defaultquantity numeric NULL DEFAULT '0'::numeric,
    maxquantity numeric NULL DEFAULT '0'::numeric,
    imageurl text NULL,
    status text NULL DEFAULT 'active'::text,
    user_id uuid NULL,
    color text NULL DEFAULT '#000000'::text,
    CONSTRAINT products_user_id_fkey FOREIGN KEY (user_id) REFERENCES "user"(id) ON UPDATE CASCADE,
    CONSTRAINT products_status_check CHECK (((status = 'active'::text) OR (status = 'archived'::text) OR (status = 'deleted'::text)))
) TABLESPACE pg_default;

CREATE TABLE public.proforma (
    invoicenumber text NOT NULL,
    vattype text NULL,
    date timestamp with time zone NOT NULL,
    deliveryterm text NULL,
    deliverydate timestamp with time zone NULL,
    paymentsplit text NULL,
    subtotal numeric(10,2) NULL,
    total numeric(10,2) NULL,
    taxrate numeric(5,2) NULL,
    totaltax numeric(10,2) NULL,
    totaldiscount numeric(10,2) NULL,
    discountrate numeric(5,2) NULL,
    numberinwords text NULL,
    comments text NULL,
    paymentstatus text NULL,
    buyer_id integer NULL,
    seller_id integer NULL,
    currency_id integer NULL DEFAULT 1,
    time_stamp timestamp with time zone NULL DEFAULT (now() AT TIME ZONE 'utc'::text),
    user_id uuid NULL,
    address_id bigint NULL,
    proforma_id uuid NOT NULL DEFAULT gen_random_uuid(),
    bank_details_id integer NULL,
    CONSTRAINT proforma_pkey PRIMARY KEY (proforma_id),
    CONSTRAINT proforma_proforma_id_key UNIQUE (proforma_id),
    CONSTRAINT proforma_buyer_id_fkey FOREIGN KEY (buyer_id) REFERENCES buyers(id),
    CONSTRAINT proforma_currency_id_fkey FOREIGN KEY (currency_id) REFERENCES currencies(id),
    CONSTRAINT proforma_seller_id_fkey FOREIGN KEY (seller_id) REFERENCES sellers(id),
    CONSTRAINT proforma_address_id_fkey FOREIGN KEY (address_id) REFERENCES seller_addresses(id),
    CONSTRAINT proforma_user_id_fkey FOREIGN KEY (user_id) REFERENCES "user"(id),
    CONSTRAINT proforma_bank_details_id_fkey FOREIGN KEY (bank_details_id) REFERENCES bank_details(id)
) TABLESPACE pg_default;

CREATE TABLE public.proforma_products (
    id bigint primary key generated always as identity,
    product_id integer NULL,
    units integer NOT NULL,
    unitprice numeric(10,2) NOT NULL,
    unitvat numeric(5,2) NOT NULL,
    unittotal numeric(10,2) NOT NULL,
    productlot text NULL DEFAULT ''::text,
    languageversion text NULL DEFAULT ''::text,
    user_id uuid NULL,
    proforma_id uuid NULL,
    invoicenumber text NULL,
    CONSTRAINT proforma_products_pkey PRIMARY KEY (id),
    CONSTRAINT proforma_products_product_id_fkey FOREIGN KEY (product_id) REFERENCES products(id),
    CONSTRAINT proforma_products_proforma_id_fkey FOREIGN KEY (proforma_id) REFERENCES proforma(proforma_id),
    CONSTRAINT proforma_products_user_id_fkey FOREIGN KEY (user_id) REFERENCES "user"(id)
) TABLESPACE pg_default;

CREATE TABLE public.seller_addresses (
    id bigint primary key generated always as identity,
    seller_id bigint NOT NULL,
    address text NOT NULL,
    country text NULL,
    user_id uuid NULL,
    CONSTRAINT seller_addresses_seller_id_fkey FOREIGN KEY (seller_id) REFERENCES sellers(id) ON DELETE CASCADE,
    CONSTRAINT seller_addresses_user_id_fkey FOREIGN KEY (user_id) REFERENCES "user"(id) ON UPDATE CASCADE
) TABLESPACE pg_default;

CREATE TABLE public.sellers (
    id bigint primary key generated always as identity,
    name text NOT NULL,
    address text NOT NULL,
    vatnumber text NULL,
    displayname text NULL,
    managingdirector text NULL,
    country text NULL,
    user_id uuid NULL,
    primary_address bigint NULL,
    CONSTRAINT sellers_primary_address_fkey FOREIGN KEY (primary_address) REFERENCES seller_addresses(id) ON UPDATE CASCADE ON DELETE SET DEFAULT,
    CONSTRAINT sellers_user_id_fkey FOREIGN KEY (user_id) REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE SET DEFAULT
) TABLESPACE pg_default;

CREATE TABLE
  public.signatures (
    id UUID NOT NULL DEFAULT gen_random_uuid (),
    user_id UUID NOT NULL,
    seller_id BIGINT NULL,
    NAME TEXT NOT NULL,
    email TEXT NOT NULL,
    image TEXT NOT NULL,
    color TEXT NOT NULL DEFAULT '#000000'::TEXT,
    created_at TIMESTAMP WITH TIME ZONE NULL DEFAULT NOW(),
    is_default BOOLEAN NULL DEFAULT FALSE,
    CONSTRAINT signatures_pkey PRIMARY KEY (id),
    CONSTRAINT unique_default_signature UNIQUE (user_id, is_default),
    CONSTRAINT signatures_seller_id_fkey FOREIGN KEY (seller_id) REFERENCES sellers (id) ON UPDATE CASCADE ON DELETE SET NULL,
    CONSTRAINT signatures_user_id_fkey FOREIGN KEY (user_id) REFERENCES "user" (id) ON UPDATE CASCADE ON DELETE CASCADE
  ) TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS idx_signatures_user_id ON public.signatures USING btree (user_id) TABLESPACE pg_default;
CREATE INDEX IF NOT EXISTS idx_signatures_seller_id ON public.signatures USING btree (seller_id) TABLESPACE pg_default;

CREATE TABLE public.user (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    role text NULL DEFAULT 'user'::text,
    CONSTRAINT user_pkey PRIMARY KEY (id)
) TABLESPACE pg_default;
