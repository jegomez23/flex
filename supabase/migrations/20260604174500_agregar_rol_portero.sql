alter table public.perfiles
  drop constraint if exists perfiles_rol_check;

alter table public.perfiles
  add constraint perfiles_rol_check
  check (rol in ('cliente', 'staff', 'admin', 'portero'));

drop policy if exists "portero: ver reservas" on public.reservas;
drop policy if exists "portero: completar reservas" on public.reservas;

create policy "portero: ver reservas"
  on public.reservas for select
  using ( public.mi_rol() in ('portero', 'admin') );

create policy "portero: completar reservas"
  on public.reservas for update
  using (
    public.mi_rol() in ('portero', 'admin')
    and estado = 'pagada'
  )
  with check (
    public.mi_rol() in ('portero', 'admin')
    and estado = 'completada'
  );
