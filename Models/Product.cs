using System.Runtime.Serialization;
using System.Runtime.Serialization.DataContracts;

namespace Ost_Ecommerce.Models
{
    public class Product
    {
        [DataMember]
        public string Name { get; set; }
        [DataMember]
        public string Picture { get; set; }
        [DataMember]
        public string Price { get; set; }
        [DataMember]
        public string Quantity { get; set; }
    }
}
