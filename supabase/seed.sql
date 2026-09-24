-- Demo data: the fictional seven-unit Kettle Ridge Holdings portfolio from the
-- prototype's sample reports (August 2026). Every name, address and amount is invented.
-- Load it into a development or demo project only, never into production.

do $$
declare
  o uuid;
  p_tal uuid; p_bri uuid; p_fou uuid;
  u_ta uuid; u_tb uuid; u_br uuid; u_f1 uuid; u_f2 uuid; u_f3 uuid; u_f4 uuid;
  t_vas uuid; t_koh uuid; t_ell uuid; t_neu uuid; t_pah uuid; t_okw uuid;
  l_ta uuid; l_tb uuid; l_br uuid; l_f1 uuid; l_f2 uuid; l_f4 uuid;
  wo2 uuid; wo3 uuid; wo4 uuid; wo1 uuid;
begin
  insert into public.owners (name, contact_name, email, phone, mgmt_rate, approval_threshold, reserve_target, ach_last4)
  values ('Kettle Ridge Holdings LLC', 'C. Bauer', 'owner.demo@example.com', '(262) 555-0190', 0.08, 500, 1500, '4417')
  returning id into o;

  insert into public.properties (owner_id, address, city, zip, kind, year_built)
  values (o, '1042 Tallmadge St', 'Mukwonago', '53149', 'Duplex', 1968) returning id into p_tal;
  insert into public.properties (owner_id, address, city, zip, kind, year_built)
  values (o, '318 Brinkman Ave', 'Elkhorn', '53121', 'Single family', 1954) returning id into p_bri;
  insert into public.properties (owner_id, address, city, zip, kind, year_built)
  values (o, '7 Foundry Ct', 'Waukesha', '53186', 'Four-plex', 1977) returning id into p_fou;

  insert into public.units (property_id, label, beds, baths, market_rent, status) values (p_tal, 'A', 2, 1, 1395, 'occupied') returning id into u_ta;
  insert into public.units (property_id, label, beds, baths, market_rent, status) values (p_tal, 'B', 2, 1, 1450, 'occupied') returning id into u_tb;
  insert into public.units (property_id, label, beds, baths, market_rent, status) values (p_bri, '', 3, 1.5, 1850, 'occupied') returning id into u_br;
  insert into public.units (property_id, label, beds, baths, market_rent, status) values (p_fou, '1', 1, 1, 1200, 'occupied') returning id into u_f1;
  insert into public.units (property_id, label, beds, baths, market_rent, status) values (p_fou, '2', 2, 1, 1225, 'occupied') returning id into u_f2;
  insert into public.units (property_id, label, beds, baths, market_rent, status, asking_rent, available_on, listing_title, listing_description, pets_allowed)
  values (p_fou, '3', 2, 1, 1275, 'listed', 1275, date '2026-10-01', 'Two-bedroom upper in a quiet four-plex',
          'Fresh paint and new bedroom carpet. Off-street parking, shared laundry in the basement, water and sewer included. No smoking.', true)
  returning id into u_f3;
  insert into public.units (property_id, label, beds, baths, market_rent, status) values (p_fou, '4', 1, 1, 1225, 'occupied') returning id into u_f4;

  insert into public.tenants (full_name, email) values ('R. Vasquez', 'tenant.demo@example.com') returning id into t_vas;
  insert into public.tenants (full_name) values ('D. & M. Kohler') returning id into t_koh;
  insert into public.tenants (full_name) values ('T. Ellsworth') returning id into t_ell;
  insert into public.tenants (full_name) values ('A. Neumann') returning id into t_neu;
  insert into public.tenants (full_name) values ('J. Pahl') returning id into t_pah;
  insert into public.tenants (full_name) values ('S. Okonkwo') returning id into t_okw;

  insert into public.leases (unit_id, start_date, end_date, rent, deposit, late_fee, status) values (u_ta, '2025-07-01', '2027-06-30', 1350, 1350, 45, 'active') returning id into l_ta;
  insert into public.leases (unit_id, start_date, end_date, rent, deposit, late_fee, status) values (u_tb, '2025-09-01', '2027-08-31', 1425, 1425, 45, 'active') returning id into l_tb;
  insert into public.leases (unit_id, start_date, end_date, rent, deposit, late_fee, status, notice_date) values (u_br, '2024-11-01', '2026-10-31', 1795, 1795, 50, 'notice_given', '2026-09-01') returning id into l_br;
  insert into public.leases (unit_id, start_date, end_date, rent, deposit, late_fee, status) values (u_f1, '2026-05-01', '2027-04-30', 1175, 1175, 40, 'active') returning id into l_f1;
  insert into public.leases (unit_id, start_date, end_date, rent, deposit, late_fee, status) values (u_f2, '2025-03-01', '2027-02-28', 1150, 1150, 40, 'active') returning id into l_f2;
  insert into public.leases (unit_id, start_date, end_date, rent, deposit, late_fee, status) values (u_f4, '2025-10-01', '2026-09-30', 1200, 1200, 40, 'renewal_out') returning id into l_f4;

  insert into public.lease_tenants values (l_ta, t_vas), (l_tb, t_koh), (l_br, t_ell), (l_f1, t_neu), (l_f2, t_pah), (l_f4, t_okw);

  -- August 2026 work orders
  insert into public.work_orders (number, property_id, unit_id, opened_on, category, title, description, vendor, status, cost, closed_on)
  values ('2608-01', p_fou, null, '2026-08-02', 'Electrical', 'Stairwell fixture dark', 'Lamps and photocell replaced.', 'In-house', 'closed', 38.19, '2026-08-02') returning id into wo1;
  insert into public.work_orders (number, property_id, unit_id, opened_on, category, title, description, vendor, status, cost, closed_on)
  values ('2608-02', p_tal, u_tb, '2026-08-06', 'Plumbing', 'No hot water',
          'Igniter assembly failed on an 11-year-old heater; replaced same visit. Tank is at end of expected life — plan a replacement in the next 18 months.',
          'Krueger Plumbing', 'closed', 142.00, '2026-08-07') returning id into wo2;
  insert into public.work_orders (number, property_id, unit_id, opened_on, category, title, description, vendor, status, cost, closed_on)
  values ('2608-03', p_bri, u_br, '2026-08-11', 'Exterior', 'Rear gutters overflowing', 'Cleared and downspout re-seated.', 'Sturm Exteriors', 'closed', 165.00, '2026-08-14') returning id into wo3;
  insert into public.work_orders (number, property_id, unit_id, opened_on, category, title, description, vendor, status, cost, closed_on)
  values ('2608-04', p_fou, u_f3, '2026-08-19', 'Life safety', 'Smoke and CO detectors past 10-year date', 'All three replaced and logged.', 'In-house', 'closed', 47.85, '2026-08-19') returning id into wo4;
  insert into public.work_orders (number, property_id, unit_id, opened_on, category, title, description, vendor, status, bid_amount)
  values ('2608-05', p_fou, u_f2, '2026-08-28', 'HVAC', 'Furnace inducer motor grinding on startup',
          'Diagnostic confirms bearing failure; unit still heats. Bid sent for owner approval Aug 29.', 'Bauer Heating', 'awaiting_approval', 410.00);
  insert into public.work_orders (number, property_id, unit_id, opened_on, category, title, description, vendor, status, bid_amount)
  values ('2608-06', p_fou, u_f3, '2026-08-31', 'Turnover', 'Turnover after move-out',
          'Paint two rooms, replace bedroom carpet, full clean, re-key. Scope and bid sent Sep 1.', 'Multiple', 'approved', 1240.00);

  -- August 2026 receipts
  insert into public.transactions (property_id, unit_id, lease_id, txn_date, kind, category, payee_payer, method, amount) values
    (p_tal, u_ta, l_ta, '2026-08-01', 'receipt', 'rent', 'R. Vasquez', 'Autopay', 1350.00),
    (p_fou, u_f1, l_f1, '2026-08-01', 'receipt', 'rent', 'A. Neumann', 'Autopay', 1175.00),
    (p_fou, u_f3, null, '2026-08-01', 'receipt', 'rent', 'L. Brzezinski', 'Autopay', 1225.00),
    (p_fou, u_f4, l_f4, '2026-08-01', 'receipt', 'rent', 'S. Okonkwo', 'Autopay', 1200.00),
    (p_bri, u_br, l_br, '2026-08-02', 'receipt', 'rent', 'T. Ellsworth', 'Bank transfer', 1795.00),
    (p_fou, u_f2, l_f2, '2026-08-03', 'receipt', 'rent', 'J. Pahl', 'Bank transfer', 1150.00),
    (p_tal, u_tb, l_tb, '2026-08-08', 'receipt', 'rent', 'D. & M. Kohler', 'Bank transfer', 1425.00),
    (p_tal, u_tb, l_tb, '2026-08-08', 'receipt', 'late_fee', 'D. & M. Kohler', 'Bank transfer', 45.00);

  -- August 2026 disbursements
  insert into public.transactions (property_id, unit_id, work_order_id, txn_date, kind, category, description, payee_payer, reference, amount) values
    (p_tal, null, null, '2026-08-04', 'disbursement', 'grounds', 'Lawn contract, monthly', 'Hoerig Lawn & Snow', 'INV 4821', 120.00),
    (p_fou, null, null, '2026-08-04', 'disbursement', 'grounds', 'Lawn contract, monthly', 'Hoerig Lawn & Snow', 'INV 4822', 180.00),
    (p_tal, u_tb, wo2, '2026-08-07', 'disbursement', 'repairs', 'Water heater igniter assembly, labor 1.0 hr', 'Krueger Plumbing', 'WO-2608-02', 142.00),
    (p_bri, u_br, wo3, '2026-08-14', 'disbursement', 'repairs', 'Gutter clearing, rear elevation', 'Sturm Exteriors', 'WO-2608-03', 165.00),
    (p_fou, null, null, '2026-08-18', 'disbursement', 'utilities', 'Water & sewer, Jun–Jul cycle (owner-paid)', 'City of Waukesha', 'ACCT 88-2140', 312.44),
    (p_fou, u_f3, wo4, '2026-08-19', 'disbursement', 'supplies', 'Smoke and CO detectors, 10-year date expired', 'DH PM (at cost)', 'WO-2608-04', 47.85),
    (p_fou, null, wo1, '2026-08-21', 'disbursement', 'supplies', 'Stairwell lamps and photocell', 'Ace Hardware', 'WO-2608-01', 38.19);
end $$;
