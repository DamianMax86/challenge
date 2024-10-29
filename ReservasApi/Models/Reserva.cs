namespace ReservasApi.Models
{
    public class Reserva
    {
        public int Id { get; set; }
        public string NombreCliente { get; set; }
        public DateTime Fecha { get; set; }
        public TimeSpan Hora { get; set; }
        public int NumeroPersonas { get; set; }
    }
}
