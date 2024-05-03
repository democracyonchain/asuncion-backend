
export class Operaciones {
  /*
   * Constantes Operaciones Query
   */

  public static readonly CT_OPERACIONES_WHERE_QUERY = [
    'is',
    'is_date',
    'lt_date',
    'lte_date',
    'gt_date',
    'gte_date',
    'not',
    'in',
    'not_in',
    'lt',
    'lte',
    'gt',
    'gte',
    'contains',
    'not_contains',
    'starts_with',
    'ends_with',
    'is_null',
    'between',
     ];

  /**
   * @const readonly Operación de consulta cuando es igual al valor de búsqueda. = :value
   */
  public static readonly IS = 'is';


    /**
   * @const readonly Operación de consulta cuando es igual al valor de búsqueda. = :value
   */
    public static readonly IS_DATE = 'is_date';
  /**
   * @const readonly Operación de consulta cuando NO es igual al valor de búsqueda. != :notvalue
   */
  public static readonly NOT = 'not';

  /**
   * @const readonly Operación de consulta en un rango de valores. IN :invalue  []
   */
  public static readonly IN = 'in';

  /**
   * @const readonly  Operación de consulta que NO PERTENECEN a un rango de valores. NOT IN :notinvalue []
   */
  public static readonly NOT_IN = 'not_in';

    /**
   * @const readonly Operación de consulta cuando es Nulll. = :value
   */
    public static readonly ISNULL = 'is_null';

  /**
   * @const readonly  Operación de consulta menor a. < :ltvalue
   */
  public static readonly LT = 'lt';

  /**
   * @const readonly  Operación de consulta menor o igual a. <= :ltevalue
   */
  public static readonly LTE = 'lte';

  /**
   * @const readonly  Operación de consulta mayor a. > :ltevalue
   */
  public static readonly GT = 'gt';

  /**
   * @const readonly  Operación de consulta mayor o igual a. >= :ltevalue
   */
  public static readonly GTE = 'gte';

   /**
   * @const readonly  Operación de consulta menor a. < :ltvalue
   */
   public static readonly LT_DATE = 'lt_date';

   /**
    * @const readonly  Operación de consulta menor o igual a. <= :ltevalue
    */
   public static readonly LTE_DATE = 'lte_date';
 
   /**
    * @const readonly  Operación de consulta mayor a. > :ltevalue
    */
   public static readonly GT_DATE = 'gt_date';
 
   /**
    * @const readonly  Operación de consulta mayor o igual a. >= :ltevalue
    */
   public static readonly GTE_DATE = 'gte_date';

  /**
   * @const readonly  Operación de consulta que contiene el patrón dado. LIKE :convalue
   */
  public static readonly CONTAINS = 'contains';

  /**
   * @const readonly  Operación de consulta que NO contiene el patrón dado. NOT LIKE :notconvalue
   */
  public static readonly NOT_CONTAINS = 'not_contains';

  /**
   * @const readonly  Operación de consulta que inicia con el patrón dado. LIKE :swvalue%
   */
  public static readonly STARTS_WITH = 'starts_with';

  /**
   * @const readonly  Operación de consulta que termina con el patrón dado. LIKE %:swvalue
   */
  public static readonly ENDS_WITH = 'ends_with';

  /**
   * @const readonly  Operación de consulta que termina con el patrón dado. LIKE %:swvalue
   */
  public static readonly BETWEEN = 'between';

  }

