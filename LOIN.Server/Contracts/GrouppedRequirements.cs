﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xbim.Ifc4.ExternalReferenceResource;

namespace LOIN.Server.Contracts
{
    public class GrouppedRequirements: LoinItem
    {
        public string NoteCS { get; set; }
        public string NoteEN { get; set; }

        public string IFCType { get; set; }
        public string IFCPredefinedType { get; set; }

        public string Code { get; set; }
        public List<int> Path { get; set; }
        public IEnumerable<Requirement> Requirements { get; }

        public GrouppedRequirements(Context.BreakdownItem item, IEnumerable<Requirement> requirements): base(item)
        {
            Code = item.Code;
            NoteCS = item.GetNote("cs");
            NoteEN = item.GetNote("en");

            if (item.Entity is IfcClassificationReference cref)
            {
                IFCType = cref.GetIFCType();
                IFCPredefinedType = cref.GetIFCPredefinedType();
            }

            var path = new List<int> { item.Entity.EntityLabel };
            path.AddRange(item.Parents.Select(p => p.Entity.EntityLabel));
            path.Reverse();
            Path = path;
            Requirements = requirements;
        }
    }
}
